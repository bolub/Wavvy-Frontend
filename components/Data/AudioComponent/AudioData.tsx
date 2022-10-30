import {
  Box,
  Flex,
  HStack,
  Icon,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  chakra,
  VStack,
  Editable,
  EditablePreview,
  EditableInput,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

import Book from '../../UI/Icons/Book';

import ETag from '../../UI/Icons/ETag';
import Plus from '../../UI/Icons/Plus';

import { ViewAddTags } from '../ViewAddTags';

import { getCookie } from 'cookies-next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNote, deleteNote, updateNote } from '../../../API/notes';
import { useState } from 'react';

import { useAudio } from 'react-use';
import Play from '../../UI/Icons/Play';
import Pause from '../../UI/Icons/Pause';

import dayjs from 'dayjs';
import ThreeDots from '../../UI/Icons/ThreeDots';
import useCustomEditor from '../../../hooks/useCustomEditor';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { updateRecording } from '../../../API/recordings';

const AudioData = ({ currentData }: any) => {
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

  // update recording
  const { mutate, isLoading, isError } = useMutation(updateRecording, {
    onSuccess() {
      queryClient.invalidateQueries(['recordings']);
    },
  });

  // ===========================================================================

  // Audio player
  const [audio, state, controls] = useAudio({
    src: `${currentData?.attributes?.audio?.data?.attributes?.url}`,
    autoPlay: false,
  });

  const [newAudioInput, setNewAudioInput] = useState('');

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup ml={2} spacing={1} justifyContent='center' size='sm'>
        <Tooltip label='Update'>
          <IconButton
            aria-label='update'
            icon={<HiOutlineCheck />}
            rounded='full'
            {...getSubmitButtonProps()}
          />
        </Tooltip>

        <Tooltip label='Close'>
          <IconButton
            aria-label='Close'
            icon={<HiOutlineX />}
            rounded='full'
            {...getCancelButtonProps()}
          />
        </Tooltip>
      </ButtonGroup>
    ) : null;
  };

  return (
    <>
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
                <Editable
                  display={'flex'}
                  defaultValue={currentData?.attributes?.title}
                  onSubmit={() => {
                    mutate({
                      id: currentData?.id,
                      data: {
                        title: newAudioInput,
                      },
                    });
                  }}
                >
                  <EditablePreview
                    fontSize='sm'
                    fontWeight={'semibold'}
                    color='gray.700'
                  />
                  <EditableInput
                    fontSize='sm'
                    fontWeight={'semibold'}
                    color='gray.700'
                    onChange={(e) => {
                      setNewAudioInput(e.target.value);
                    }}
                  />

                  <EditableControls />
                </Editable>

                <Text fontSize='sm' fontWeight={'medium'} color='gray.700'>
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
        flexDir={{ base: 'column', md: 'row' }}
      >
        {/* Header */}
        <HStack spacing='5px'>
          <Icon active as={ETag} fontSize='24px' />
          <Text fontSize={'sm'} fontWeight='semibold' color='gray.700'>
            Tags
          </Text>
        </HStack>

        {/* Content */}
        <Box ml={{ md: '60px' }} mt={{ base: 4, md: 1 }}>
          <ViewAddTags
            tags={currentData?.attributes?.tags}
            id={currentData?.id}
          />
        </Box>
      </Flex>

      {/* Notes */}
      <Flex align={'start'} p='24px' flexDir={{ base: 'column', md: 'row' }}>
        {/* Header */}
        <HStack spacing='5px'>
          <Icon as={Book} fontSize='24px' />
          <Text fontSize={'sm'} fontWeight='semibold' color='gray.700'>
            Notes
          </Text>
        </HStack>

        {/* Content */}
        <Box ml={{ md: '60px' }} w='full' mt={{ base: 4, md: 1 }}>
          <VStack align={'start'}>
            {currentData?.attributes?.notes?.data?.map((noteData: any) => {
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
                currentData?.attributes?.notes?.data?.length > 0 ? '20px' : ''
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
                currentData?.attributes?.notes?.data?.length > 0 ? '20px' : ''
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
    </>
  );
};

export default AudioData;
