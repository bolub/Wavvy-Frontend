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
import React, { FC } from 'react';
import { RecordingsDataProps } from '../../utils/GeneralProps';
import Book from '../UI/Icons/Book';
import ChevronLeft from '../UI/Icons/ChevronLeft';
import ChevronRight from '../UI/Icons/ChevronRight';
import ETag from '../UI/Icons/ETag';
import Plus from '../UI/Icons/Plus';
import ThreeDots from '../UI/Icons/ThreeDots';
import { ViewAddTags } from './ViewAddTags';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAudio } from 'react-use';
import Play from '../UI/Icons/Play';
import Pause from '../UI/Icons/Pause';
import DeleteData from './DeleteData';
dayjs.extend(relativeTime);

const AudioComponent: FC<{
  data?: RecordingsDataProps;
}> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteRecordingDisclosure = useDisclosure();

  const [audio, state, controls] = useAudio({
    src: `http://localhost:1337${data?.attributes?.audio?.data?.attributes?.url}`,
    autoPlay: false,
  });

  if (!data) {
    return <></>;
  }

  return (
    <>
      {audio}
      <Flex w='full'>
        <HStack w='40%' spacing='13px'>
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
                {data?.attributes?.title}
              </Text>
              <Text fontSize='sm' fontWeight={'medium'} color='gray.700'>
                {data?.attributes?.duration}
              </Text>
            </HStack>

            <Text mt='7px' fontSize='xs' fontWeight={'medium'} color='gray.700'>
              {dayjs(data?.attributes?.createdAt)?.fromNow()}
            </Text>
          </Box>
        </HStack>

        {/* Tags */}
        <Wrap w='30%' spacingX={'10px'}>
          {data?.attributes?.tags?.data?.map((tagData) => {
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
        <Flex w='20%' justifyContent={'end'}>
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
              {data?.attributes?.custom_folder?.data?.attributes?.name}
            </chakra.h2>

            <HStack ml='auto' my='auto' spacing={'12px'}>
              <HStack spacing={'5px'}>
                <IconButton
                  aria-label='Previous'
                  icon={<ChevronLeft />}
                  variant='ghost'
                  size='sm'
                />
                <IconButton
                  aria-label='Next'
                  icon={<ChevronRight />}
                  variant='ghost'
                  size='sm'
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
                        noOfLines={1}
                        maxW='200px'
                      >
                        {data?.attributes?.title}
                      </Text>
                      <Text
                        fontSize='sm'
                        fontWeight={'medium'}
                        color='gray.700'
                      >
                        {data?.attributes?.duration}
                      </Text>
                    </HStack>

                    <Text
                      mt='7px'
                      fontSize='xs'
                      fontWeight={'medium'}
                      color='gray.700'
                    >
                      {dayjs(data?.attributes?.createdAt)?.fromNow()}
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
                <ViewAddTags tags={data?.attributes?.tags} id={data?.id} />
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
              <Box ml='60px' mt={1}>
                <VStack>
                  {data?.attributes?.notes?.data?.map((noteData) => {
                    return (
                      <Text key={noteData?.id} fontSize={'sm'}>
                        {noteData?.attributes?.content}
                      </Text>
                    );
                  })}
                </VStack>

                <Button
                  // @ts-ignore
                  mt={data?.attributes?.notes?.data?.length > 0 ? '20px' : ''}
                  pl={1}
                  variant={'ghost'}
                  size='sm'
                  fontWeight={'semibold'}
                  leftIcon={<Plus />}
                  iconSpacing='2px'
                  colorScheme={'gray'}
                >
                  Add Note
                </Button>
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
                name: data?.attributes?.title,
                id: data?.id?.toString(),
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
