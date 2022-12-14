import React, { FC, ReactElement, useState } from 'react';
import {
  Box,
  Flex,
  chakra,
  HStack,
  Icon,
  Container,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tooltip,
} from '@chakra-ui/react';
import ChevronDown from '../UI/Icons/ChevronDown';
import Folder from '../UI/Icons/Folder';
import { useQuery } from '@tanstack/react-query';
import { fetchAllFolders } from '../../API/folders';
import { FetchFoldersProps, TagsDatum } from '../../utils/GeneralProps';
import CustomLink from '../UI/CustomLink';
import { DASHBOARD_ROUTES } from '../../utils/routes';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { allFoldersState, folderState } from '../../recoil/folder';
import ETag from '../UI/Icons/ETag';
import { fetchAllTags } from '../../API/tags';
import { allTagsState, tagsState } from '../../recoil/tags';
import Plus from '../UI/Icons/Plus';
import NewFolder from '../Data/NewFolder';
import NewTag from '../Data/NewTag';
import Trash from '../UI/Icons/Trash';
import DeleteData from '../Data/DeleteData';
import Empty from '../UI/Empty';

const Left: FC<{ linkOnClick?: () => void }> = ({ linkOnClick }) => {
  const setCurrentFolder = useSetRecoilState(folderState);
  const setCurrentTag = useSetRecoilState(tagsState);
  const setAllTags = useSetRecoilState(allTagsState);
  const setAllFolders = useSetRecoilState(allFoldersState);

  const { asPath } = useRouter();

  const { data } = useQuery(['allFolders'], fetchAllFolders, {
    onSuccess(data) {
      setAllFolders(data);

      const currentFolder = data?.find((td: FetchFoldersProps) => {
        return td?.id.toString() === localStorage.getItem('currentFolderId');
      });

      setCurrentFolder(currentFolder);
    },
  });
  const { data: tagsData } = useQuery(['allTags'], fetchAllTags, {
    onSuccess(data) {
      setAllTags(data);

      const currentTag = data?.find((td: TagsDatum) => {
        return td?.id.toString() === localStorage.getItem('currentTagId');
      });

      setCurrentTag(currentTag);
    },
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [contentType, setContentType] = useState<
    'folder' | 'tag' | 'recording'
  >('folder');
  const [actionType, setActionType] = useState('');
  const [contentInfo, setContentInfo] = useState({
    name: '',
    id: '',
  });
  return (
    <>
      <Accordion defaultIndex={[0, 1]} allowMultiple>
        {/* Folders */}
        <AccordionItem border={0}>
          {/* header */}
          <chakra.h2>
            <AccordionButton border={0} px={0}>
              <Box
                textAlign='left'
                fontSize={'sm'}
                color='gray.700'
                fontWeight={'bold'}
              >
                Folders
              </Box>
              <Icon as={ChevronDown} ml={3} />

              <Tooltip
                label='Create Folder'
                openDelay={800}
                size='xs'
                fontSize={'xs'}
              >
                <IconButton
                  aria-label='Create Folder'
                  // @ts-ignore
                  icon={<Plus width='20px' height='20px' />}
                  rounded='full'
                  size={'sm'}
                  colorScheme='gray'
                  variant={'ghost'}
                  ml='auto'
                  zIndex={10}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                    setContentType('folder');
                    setActionType('create');
                  }}
                />
              </Tooltip>
            </AccordionButton>
          </chakra.h2>

          {/* content */}
          <AccordionPanel pl={0} pt={0}>
            <VStack align={'start'} spacing='12px' mt={2}>
              {data?.map((folderData: FetchFoldersProps) => {
                const isActive = asPath?.includes(
                  `${
                    DASHBOARD_ROUTES.FOLDER
                  }/${folderData?.attributes?.name.replaceAll(' ', '%20')}`
                );

                return (
                  <Flex key={folderData?.id} role='group' w='full'>
                    <CustomLink
                      href={`${DASHBOARD_ROUTES.FOLDER}/${folderData?.attributes?.name}?uId=${folderData?.id}`}
                      containerProps={{
                        onClick: () => {
                          localStorage.setItem(
                            'currentFolderId',
                            folderData?.id?.toString()
                          );
                          setCurrentFolder(folderData);

                          if (linkOnClick) {
                            linkOnClick();
                          }
                        },
                        width: 'full',
                        my: 'auto',
                      }}
                    >
                      <HStack my='auto' w='full'>
                        <Folder
                          active={isActive}
                          top={isActive ? '#BEE3F8' : ''}
                          bottom={isActive ? '#3182CE' : ''}
                        />

                        <Text
                          my='auto'
                          color={isActive ? 'gray.900' : 'gray.500'}
                          fontSize={'sm'}
                          _hover={{
                            fontWeight: 'semibold',
                            color: 'gray.900',
                          }}
                          fontWeight={isActive ? 'semibold' : 'medium'}
                        >
                          {folderData?.attributes?.name}
                        </Text>
                      </HStack>
                    </CustomLink>

                    <Tooltip
                      label={`Delete ${folderData?.attributes?.name}`}
                      openDelay={800}
                    >
                      <IconButton
                        my='auto'
                        ml='auto'
                        aria-label='Delete'
                        icon={<Trash />}
                        variant='ghost'
                        colorScheme={'blue'}
                        minW='auto'
                        size='sm'
                        visibility={'hidden'}
                        _groupHover={{
                          visibility: 'visible',
                        }}
                        transition='all 0.2s'
                        onClick={(e) => {
                          onOpen();
                          setContentType('folder');
                          setContentInfo({
                            name: folderData?.attributes?.name,
                            id: folderData?.id.toString(),
                          });
                          setActionType('delete');
                        }}
                      />
                    </Tooltip>
                  </Flex>
                );
              })}

              {data?.length === 0 && (
                <Empty mx='auto' my={5} title='Start adding folders' />
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* Tags */}
        <AccordionItem mt={10} border={0}>
          {/* header */}
          <chakra.h2>
            <AccordionButton border={0} px={0}>
              <Box
                textAlign='left'
                fontSize={'sm'}
                color='gray.700'
                fontWeight={'bold'}
              >
                Tags
              </Box>
              <Icon as={ChevronDown} ml={3} />

              <Tooltip
                label='Create Tag'
                openDelay={800}
                size='xs'
                fontSize={'xs'}
              >
                <IconButton
                  aria-label='Create Tag'
                  // @ts-ignore
                  icon={<Plus width='20px' height='20px' />}
                  rounded='full'
                  size={'sm'}
                  colorScheme='gray'
                  variant={'ghost'}
                  ml='auto'
                  zIndex={10}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                    setContentType('tag');
                    setActionType('create');
                  }}
                />
              </Tooltip>
            </AccordionButton>
          </chakra.h2>

          {/* content */}
          <AccordionPanel pl={0} pt={0}>
            <VStack align={'start'} spacing='12px' mt={2}>
              {tagsData?.map((tagsData: TagsDatum) => {
                const isActive = asPath?.includes(
                  `/tag/${tagsData?.attributes?.title.replaceAll(' ', '%20')}`
                );

                return (
                  <Flex key={tagsData?.id} role='group' w='full'>
                    <CustomLink
                      href={`/tag/${tagsData?.attributes?.title}?uId=${tagsData?.id}`}
                      containerProps={{
                        role: 'group',
                        onClick: () => {
                          localStorage.setItem(
                            'currentTagId',
                            tagsData?.id?.toString()
                          );
                          setCurrentTag(tagsData);
                          if (linkOnClick) {
                            linkOnClick();
                          }
                        },
                      }}
                    >
                      <HStack>
                        <Icon
                          as={ETag}
                          active={isActive}
                          fontSize='24px'
                          my='auto'
                        />

                        <Text
                          color={isActive ? 'gray.900' : 'gray.500'}
                          fontSize={'sm'}
                          _hover={{
                            fontWeight: 'semibold',
                            color: 'gray.900',
                          }}
                          fontWeight={isActive ? 'semibold' : 'medium'}
                        >
                          {tagsData?.attributes?.title}
                        </Text>
                      </HStack>
                    </CustomLink>

                    <Tooltip
                      label={`Delete ${tagsData?.attributes?.title}`}
                      openDelay={800}
                    >
                      <IconButton
                        my='auto'
                        ml='auto'
                        aria-label='Delete'
                        icon={<Trash />}
                        variant='ghost'
                        colorScheme={'blue'}
                        minW='auto'
                        size='sm'
                        visibility={'hidden'}
                        _groupHover={{
                          visibility: 'visible',
                        }}
                        transition='all 0.2s'
                        onClick={(e) => {
                          onOpen();
                          setContentType('tag');
                          setContentInfo({
                            name: tagsData?.attributes?.title,
                            id: tagsData?.id.toString(),
                          });
                          setActionType('delete');
                        }}
                      />
                    </Tooltip>
                  </Flex>
                );
              })}

              {tagsData?.length === 0 && (
                <Empty mx='auto' my={5} title='Start adding tags' />
              )}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

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
              {actionType === 'create' ? 'New' : 'Delete'}{' '}
              {contentType === 'folder' ? 'Folder' : 'Tag'}
            </chakra.h2>

            <ModalCloseButton
              pos='static'
              colorScheme={'blue'}
              ml='auto'
              my='auto'
            />
          </ModalHeader>

          <ModalBody p={0}>
            {actionType === 'create' ? (
              <>
                {contentType === 'folder' && <NewFolder onClose={onClose} />}
                {contentType === 'tag' && <NewTag onClose={onClose} />}
              </>
            ) : (
              <DeleteData
                contentInfo={contentInfo}
                contentType={contentType}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Left;
