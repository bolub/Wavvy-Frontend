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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import React, { FC, useMemo, useState } from 'react';
import { RecordingsDataProps } from '../../../utils/GeneralProps';
import ChevronLeft from '../../UI/Icons/ChevronLeft';
import ChevronRight from '../../UI/Icons/ChevronRight';
import ThreeDots from '../../UI/Icons/ThreeDots';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAudio } from 'react-use';
import Play from '../../UI/Icons/Play';
import Pause from '../../UI/Icons/Pause';
import DeleteData from '../DeleteData';
import AudioData from './AudioData';

dayjs.extend(relativeTime);

const AudioComponent: FC<{
  data: RecordingsDataProps;
  index: number;
  allRecs: RecordingsDataProps[];
}> = ({ index, allRecs, data }) => {
  //======================= chakra ===================
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteRecordingDisclosure = useDisclosure();
  const btnRef = React.useRef<any>();
  // =================================================

  const [currentIndex, setCurrentIndex] = useState(index);

  const currentData = useMemo(() => {
    return allRecs[currentIndex];
  }, [allRecs, currentIndex]);

  // Audio player
  const [audio, state, controls] = useAudio({
    src: `${currentData?.attributes?.audio?.data?.attributes?.url}`,
    autoPlay: false,
  });

  return (
    <>
      {audio}

      {/* header */}
      <Flex w='full'>
        <HStack
          mr={{ base: 5, md: 'unset' }}
          w={{ md: '50%' }}
          pr={{ base: 0, md: 8 }}
          spacing='13px'
        >
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

          <Box ref={btnRef} onClick={onOpen} cursor='pointer'>
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
        <Wrap
          display={{ base: 'none', md: 'flex' }}
          w='35%'
          pr={{ base: 0, md: 8 }}
          spacingX={'10px'}
        >
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
        <Flex
          ml={{ base: 'auto', md: 'unset' }}
          w={{ md: '15%' }}
          justifyContent={'end'}
        >
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
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='696px' borderRadius={'16px'}>
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

          <ModalBody
            p={0}
            maxH={{ base: '600px', md: '700px' }}
            overflowY={'auto'}
          >
            <AudioData currentData={currentData} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant='ghost' colorScheme={'gray'}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      {/* View data drawer */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            display='flex'
            borderBottomWidth={'1px'}
            borderColor='gray.100'
            py='12px'
            px='24px'
            as='div'
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
          </DrawerHeader>

          <DrawerBody
            p={0}
            // maxH={{ base: '600px', md: '700px' }}
            overflowY={'auto'}
          >
            <AudioData currentData={currentData} />
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={onClose} variant='ghost' colorScheme={'gray'}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
