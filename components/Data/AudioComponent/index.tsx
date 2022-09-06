import {
  Box,
  Flex,
  HStack,
  Icon,
  Tag,
  Text,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  chakra,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import { RecordingsDataProps } from '../../../utils/GeneralProps';
import Book from '../../UI/Icons/Book';
import ChevronLeft from '../../UI/Icons/ChevronLeft';
import ChevronRight from '../../UI/Icons/ChevronRight';
import ETag from '../../UI/Icons/ETag';
import Plus from '../../UI/Icons/Plus';
import ThreeDots from '../../UI/Icons/ThreeDots';
import { ViewAddTags } from '../ViewAddTags';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAudio } from 'react-use';
import Play from '../../UI/Icons/Play';
import Pause from '../../UI/Icons/Pause';
import DeleteData from '../DeleteData';
import useCustomEditor from '../../../hooks/useCustomEditor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNote, deleteNote, updateNote } from '../../../API/notes';
import { getCookie } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { allFolderRecordingsForPlayerState } from '../../../recoil/folder';

dayjs.extend(relativeTime);

const AudioComponent: FC<{
  data: RecordingsDataProps;
  index: number;
  allRecs: RecordingsDataProps[];
}> = ({ index, allRecs }) => {
  //======================= chakra ===================
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteRecordingDisclosure = useDisclosure();
  // =================================================

  const setFolderRecordingsForPlayerState = useSetRecoilState(
    allFolderRecordingsForPlayerState
  );

  const [currentIndex, setCurrentIndex] = useState(index);

  const currentData = useMemo(() => {
    return allRecs[currentIndex];
  }, [allRecs, currentIndex]);

  // Audio player
  const [audio, state, controls] = useAudio({
    src: `${currentData?.attributes?.audio?.data?.attributes?.url}`,
    autoPlay: false,
  });

  // @ts-ignore
  const { editor, CustomEditor, setContent } = useCustomEditor();

  const [showAddNote, setShowAddNote] = useState(false);
  const [editableNote, setEditableNote] = useState('');

  // ============================== React Query ==============================
  const queryClient = useQueryClient();

  // Add note
  const { mutate: addNoteHandler, isLoading: addNoteLoading } = useMutation(
    addNote,
    {
      onSuccess() {
        queryClient.invalidateQueries(['recordings']);
        setShowAddNote(false);
        setContent('');
      },
    }
  );

  // Update note
  const { mutate: updateNoteHandler, isLoading: updateNoteLoading } =
    useMutation(updateNote, {
      onSuccess() {
        queryClient.invalidateQueries(['recordings']);
        setContent('');
        setEditableNote('');
      },
    });

  // Delete note
  const { mutate: deleteNoteHandler, isLoading: deleteNoteLoading } =
    useMutation(deleteNote, {
      onSuccess() {
        queryClient.invalidateQueries(['recordings']);
      },
    });

  // ===========================================================================

  return (
    <>
      {audio}
      <Flex w='full'>
        <HStack w='50%' pr={{ base: 0, md: 8 }} spacing='13px'>
          <chakra.button
            w='47px'
            h='47px'
            bg='blue.500'
            rounded='full'
            cursor='pointer'
            display='flex'
            justifyContent={'center'}
            alignItems='center'
            onClick={() => {
              if (state.paused) {
                controls.play();
              }

              if (state.playing) {
                controls.pause();
              }
            }}
            color='white'
          >
            {/* Play recording */}
            {state.paused && <Icon as={Play} />}

            {/* Pause recording */}
            {state.playing && <Icon as={Pause} fontSize='24px' />}
          </chakra.button>

          <Box onClick={onOpen} cursor='pointer'>
            <HStack spacing='7px'>
              <Text
                fontSize='sm'
                fontWeight={'semibold'}
                color='gray.700'
                noOfLines={1}
                maxW='200px'
              >
                {currentData?.attributes?.title}
              </Text>
              <Text fontSize='sm' fontWeight={'medium'} color='gray.700'>
                {currentData?.attributes?.duration}
              </Text>
            </HStack>

            <Text mt='7px' fontSize='xs' fontWeight={'medium'} color='gray.700'>
              {dayjs(currentData?.attributes?.createdAt)?.fromNow()}
            </Text>
          </Box>
        </HStack>

        {/* Tags */}
        <Wrap w='35%' pr={{ base: 0, md: 8 }} spacingX={'10px'}>
          {currentData?.attributes?.tags?.data?.map((tagData) => {
            return (
              <WrapItem key={tagData?.id}>
                <Tag
                  size='sm'
                  fontWeight={'medium'}
                  colorScheme={'gray'}
                  borderRadius='full'
                >
                  {tagData?.attributes?.title}
                </Tag>
              </WrapItem>
            );
          })}
        </Wrap>

        {/* More options */}
        <Flex w='15%' justifyContent={'end'}>
          <Menu>
            <MenuButton
              as={Button}
              variant='ghost'
              rounded='full'
              w='fit-content'
              size='sm'
            >
              <Icon as={ThreeDots} />
            </MenuButton>
            <MenuList fontSize={'sm'} color='gray.700'>
              <MenuItem
                onClick={() => {
                  if (state.paused) {
                    controls.play();
                  }

                  if (state.playing) {
                    controls.pause();
                  }
                }}
              >
                {state.paused ? 'Play' : 'Pause'}
              </MenuItem>
              <MenuItem cursor='pointer' onClick={onOpen}>
                View
              </MenuItem>
              <MenuItem onClick={deleteRecordingDisclosure.onOpen}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* View data modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='696px' borderRadius={'16px'}>
          {/* Header */}
          <ModalHeader
            display='flex'
            borderBottomWidth={'1px'}
            borderColor='gray.100'
            py='12px'
            px='24px'
          >
            <chakra.h2 fontWeight='bold' fontSize={'sm'} my='auto'>
              {currentData?.attributes?.custom_folder?.data?.attributes?.name}
            </chakra.h2>

            <HStack ml='auto' my='auto' spacing={'12px'}>
              <HStack spacing={'5px'}>
                <IconButton
                  aria-label='Previous'
                  icon={<ChevronLeft />}
                  variant='ghost'
                  size='sm'
                  isDisabled={currentIndex <= 0}
                  onClick={() => {
                    setCurrentIndex((prev) => prev - 1);
                  }}
                />
                <IconButton
                  aria-label='Next'
                  icon={<ChevronRight />}
                  variant='ghost'
                  size='sm'
                  isDisabled={currentIndex === allRecs.length - 1}
                  onClick={() => {
                    setCurrentIndex((prev) => prev + 1);
                  }}
                />
              </HStack>

              <Menu>
                <MenuButton
                  as={Button}
                  variant='ghost'
                  w='fit-content'
                  size='sm'
                >
                  <Icon as={ThreeDots} />
                </MenuButton>
                <MenuList fontSize={'sm'} color='gray.700' minW={'200px'}>
                  <MenuItem
                    onClick={() => {
                      onClose();
                      deleteRecordingDisclosure.onOpen();
                    }}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
              <ModalCloseButton pos='static' colorScheme={'blue'} />
            </HStack>
          </ModalHeader>

          {/* Content */}
          <ModalBody p={0}>
            {/* Audio details */}
            <Box p='24px' borderBottom={'1px'} borderColor='gray.100'>
              <Flex w='full'>
                <HStack spacing='13px'>
                  <chakra.button
                    w='47px'
                    h='47px'
                    bg='blue.500'
                    rounded='full'
                    cursor='pointer'
                    display='flex'
                    justifyContent={'center'}
                    alignItems='center'
                    color='white'
                    onClick={() => {
                      if (state.paused) {
                        controls.play();
                      }

                      if (state.playing) {
                        controls.pause();
                      }
                    }}
                  >
                    {/* Play recording */}
                    {state.paused && <Icon as={Play} />}

                    {/* Pause recording */}
                    {state.playing && <Icon as={Pause} fontSize='24px' />}
                  </chakra.button>

                  <Box cursor='pointer'>
                    <HStack spacing='7px'>
                      <Text
                        fontSize='sm'
                        fontWeight={'semibold'}
                        color='gray.700'
                      >
                        {currentData?.attributes?.title}
                      </Text>
                      <Text
                        fontSize='sm'
                        fontWeight={'medium'}
                        color='gray.700'
                      >
                        {currentData?.attributes?.duration}
                      </Text>
                    </HStack>

                    <Text
                      mt='7px'
                      fontSize='xs'
                      fontWeight={'medium'}
                      color='gray.700'
                    >
                      {dayjs(currentData?.attributes?.createdAt)?.fromNow()}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            </Box>

            {/* Tags */}
            <Flex
              align={'start'}
              p='24px'
              borderBottom={'1px'}
              borderColor='gray.100'
            >
              {/* Header */}
              <HStack spacing='5px'>
                <Icon active as={ETag} fontSize='24px' />
                <Text fontSize={'sm'} fontWeight='semibold' color='gray.700'>
                  Tags
                </Text>
              </HStack>

              {/* Content */}
              <Box ml='60px' mt={1}>
                <ViewAddTags
                  tags={currentData?.attributes?.tags}
                  id={currentData?.id}
                />
              </Box>
            </Flex>

            {/* Notes */}
            <Flex align={'start'} p='24px'>
              {/* Header */}
              <HStack spacing='5px'>
                <Icon as={Book} fontSize='24px' />
                <Text fontSize={'sm'} fontWeight='semibold' color='gray.700'>
                  Notes
                </Text>
              </HStack>

              {/* Content */}
              <Box ml='60px' w='full' mt={1}>
                <VStack align={'start'}>
                  {currentData?.attributes?.notes?.data?.map((noteData) => {
                    return (
                      <Box key={noteData?.id} w='full'>
                        {!(editableNote === noteData?.id.toString()) && (
                          <>
                            <Box
                              w='full'
                              maxW={'488px'}
                              bg='gray.100'
                              rounded={'5px'}
                              display='flex'
                              flexDir={'column'}
                              pl={2}
                            >
                              <Menu autoSelect={false}>
                                <MenuButton
                                  as={Button}
                                  variant='ghost'
                                  colorScheme='gray'
                                  display={'flex'}
                                  h='auto'
                                  size='sm'
                                  ml='auto'
                                  mr={2}
                                  mt={1}
                                  disabled={deleteNoteLoading}
                                >
                                  <Icon as={ThreeDots} />
                                </MenuButton>
                                <MenuList
                                  fontSize={'sm'}
                                  color='gray.700'
                                  minW={'200px'}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      deleteNoteHandler({
                                        id: noteData?.id,
                                      });
                                    }}
                                  >
                                    Delete
                                  </MenuItem>
                                </MenuList>
                              </Menu>

                              <Box
                                className='ProseMirror'
                                fontWeight='500'
                                cursor='pointer'
                                dangerouslySetInnerHTML={{
                                  // @ts-ignore
                                  __html: noteData?.attributes?.content,
                                }}
                                onClick={() => {
                                  setContent(noteData?.attributes?.content);
                                  setEditableNote(noteData?.id?.toString());
                                  setShowAddNote(false);
                                }}
                              />
                            </Box>
                          </>
                        )}

                        {editableNote === noteData?.id.toString() && (
                          <Box>
                            {CustomEditor}

                            <Flex mt={4} mb={10} mr={8}>
                              <HStack ml='auto'>
                                <Button
                                  size='sm'
                                  colorScheme={'gray'}
                                  onClick={() => {
                                    setContent('');
                                    setEditableNote('');
                                  }}
                                >
                                  Cancel
                                </Button>

                                <Button
                                  size='sm'
                                  isLoading={updateNoteLoading}
                                  onClick={() => {
                                    const dataToSend = {
                                      id: noteData?.id,
                                      content: editor?.getHTML(),
                                    };
                                    updateNoteHandler(dataToSend);
                                  }}
                                >
                                  Update
                                </Button>
                              </HStack>
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </VStack>

                {/* Add note button */}
                {!showAddNote ? (
                  <Button
                    mt={
                      // @ts-ignore
                      currentData?.attributes?.notes?.data?.length > 0
                        ? '20px'
                        : ''
                    }
                    pl={1}
                    variant={'ghost'}
                    size='sm'
                    fontWeight={'semibold'}
                    leftIcon={<Plus />}
                    iconSpacing='2px'
                    colorScheme={'gray'}
                    onClick={() => {
                      setShowAddNote(true);
                      setContent('');
                      setEditableNote('');
                    }}
                  >
                    Add Note
                  </Button>
                ) : (
                  <Box
                    mt={
                      // @ts-ignore
                      currentData?.attributes?.notes?.data?.length > 0
                        ? '20px'
                        : ''
                    }
                  >
                    {CustomEditor}

                    <Flex mt={4} mr={8}>
                      <HStack ml='auto'>
                        <Button
                          size='sm'
                          colorScheme={'gray'}
                          onClick={() => {
                            setShowAddNote(false);
                          }}
                        >
                          Cancel
                        </Button>

                        <Button
                          size='sm'
                          isLoading={addNoteLoading}
                          onClick={() => {
                            const dataToSend = {
                              data: {
                                userId: getCookie('USER_ID'),
                                content: editor?.getHTML(),
                                recording: currentData?.id,
                              },
                            };
                            addNoteHandler(dataToSend);
                          }}
                        >
                          Add
                        </Button>
                      </HStack>
                    </Flex>
                  </Box>
                )}
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant='ghost' colorScheme={'gray'}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Recording */}
      <Modal
        isOpen={deleteRecordingDisclosure.isOpen}
        onClose={deleteRecordingDisclosure.onClose}
      >
        <ModalOverlay />

        <ModalContent maxW='490px' borderRadius={'16px'}>
          <ModalHeader
            display='flex'
            borderBottomWidth={'1px'}
            borderColor='gray.100'
            py='12px'
            px='24px'
          >
            <chakra.h2 fontWeight='bold' fontSize={'sm'} my='auto'>
              Delete Recording
            </chakra.h2>

            <ModalCloseButton
              pos='static'
              colorScheme={'blue'}
              ml='auto'
              my='auto'
            />
          </ModalHeader>

          <ModalBody p={0}>
            <DeleteData
              contentInfo={{
                // @ts-ignore
                name: currentData?.attributes?.title,
                // @ts-ignore
                id: currentData?.id?.toString(),
              }}
              contentType='recording'
              onClose={deleteRecordingDisclosure.onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AudioComponent;
