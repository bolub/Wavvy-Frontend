import {
  Box,
  Flex,
  chakra,
  VStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { folderState } from '../../recoil/folder';
import {
  RecordingsDataProps,
  CustomFolderData,
} from '../../utils/GeneralProps';
import SquarePlus from '../UI/Icons/SquarePlus';
import AudioComponent from './AudioComponent';
import { NewRecording } from './NewRecording';

interface Props {
  title: string;
  data?: RecordingsDataProps[];
}

export const List: FC<Props> = ({ title, data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentFolderFromState = useRecoilValue(folderState);

  // @ts-ignore
  const currentFolderFromRecordings: CustomFolderData =
    // @ts-ignore
    data?.length > 0 ? data[0]?.attributes?.custom_folder?.data : {};

  const currentFolder = currentFolderFromState || currentFolderFromRecordings;

  const { pathname } = useRouter();

  return (
    <Box>
      {/* header */}
      <Flex w='100%'>
        <chakra.h1 my='auto' fontWeight={'bold'} color='gray.900' p={0}>
          {title}
        </chakra.h1>

        <chakra.button onClick={onOpen} my='auto' ml='auto' display='flex'>
          <Icon as={SquarePlus} my='auto' fontSize={'24px'} />

          <chakra.span
            my='auto'
            ml='6px'
            fontSize={'sm'}
            fontWeight='semibold'
            color='gray.900'
          >
            Add New
          </chakra.span>
        </chakra.button>
      </Flex>

      {/*  */}
      <VStack align={'start'} spacing='36px'>
        {data?.map((recData: RecordingsDataProps, index: number) => {
          return (
            <AudioComponent
              key={recData.id}
              data={recData}
              index={index}
              allRecs={data}
            />
          );
        })}

        <Box w='full' borderTopWidth={'1px'} pt='15px' mt='36px'>
          <chakra.button onClick={onOpen} display='flex'>
            <Icon as={SquarePlus} my='auto' fontSize={'24px'} />

            <chakra.span
              my='auto'
              ml='6px'
              fontSize={'xs'}
              fontWeight='semibold'
              color='gray.900'
            >
              Add New
            </chakra.span>
          </chakra.button>
        </Box>
      </VStack>

      {/* New recording modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
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
              New Recording
            </chakra.h2>

            <ModalCloseButton
              pos='static'
              colorScheme={'blue'}
              ml='auto'
              my='auto'
            />
          </ModalHeader>

          <ModalBody p={0}>
            <NewRecording
              type={pathname?.includes('/tag/') ? 'tag' : 'folder'}
              currentFolder={currentFolder}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
