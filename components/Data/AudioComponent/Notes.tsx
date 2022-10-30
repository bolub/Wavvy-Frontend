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
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import Book from '../../UI/Icons/Book';
import { addNote, deleteNote, updateNote } from '../../../API/notes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import Plus from '../../UI/Icons/Plus';
import { getCookie } from 'cookies-next';

import useCustomEditor from '../../../hooks/useCustomEditor';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const Notes = ({ currentData }: any) => {
  const [editableNote, setEditableNote] = useState('');

  // @ts-ignore
  const { editor, CustomEditor, setContent } = useCustomEditor();
  const [showAddNote, setShowAddNote] = useState(false);

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

  // ==========================================================================================

  const bottomDivRef = useRef<any>(null);

  const showNewNoteInput = (noteData: any) => {
    setContent(noteData?.attributes?.content);
    setEditableNote(noteData?.id?.toString());
    setShowAddNote(false);
    // bottomDivRef?.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
        <Accordion allowMultiple>
          {currentData?.attributes?.notes?.data?.map(
            (noteData: any, index: number) => {
              return (
                <AccordionItem key={noteData?.id} border={0} mb={3}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Text fontWeight={600} fontSize='sm'>
                          🗒️ &nbsp; Note {index + 1}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel px={0} pt={0} pb={4}>
                    {!(editableNote === noteData?.id.toString()) && (
                      <>
                        <Box
                          w='full'
                          display='flex'
                          flexDir={'column'}
                          pl={2}
                          pos='relative'
                        >
                          {/* Actions */}
                          <HStack ml='auto' mt={2}>
                            {/* Edit */}
                            <Button
                              leftIcon={<HiOutlinePencil />}
                              size='sm'
                              colorScheme={'gray'}
                              onClick={() => {
                                showNewNoteInput(noteData);
                              }}
                              borderBottomRadius='0px'
                            >
                              Edit
                            </Button>

                            {/* Delete */}
                            <Button
                              leftIcon={<HiOutlineTrash />}
                              size='sm'
                              colorScheme={'gray'}
                              isLoading={deleteNoteLoading}
                              borderBottomRadius='0px'
                              onClick={() => {
                                deleteNoteHandler({
                                  id: noteData?.id,
                                });
                              }}
                            >
                              Delete
                            </Button>
                          </HStack>

                          <Box
                            className='ProseMirror'
                            fontWeight='500'
                            cursor='pointer'
                            bgColor='gray.100'
                            dangerouslySetInnerHTML={{
                              // @ts-ignore
                              __html: noteData?.attributes?.content,
                            }}
                            borderRadius='4px'
                            borderTopRightRadius={'0px'}
                            onClick={() => {
                              showNewNoteInput(noteData);
                            }}
                          />
                        </Box>
                      </>
                    )}

                    {editableNote === noteData?.id.toString() && (
                      <Box>
                        {CustomEditor}

                        <Flex mt={4} mb={10} mr={8}>
                          <HStack>
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
                              isDisabled={
                                editor?.getHTML() ===
                                noteData?.attributes?.content
                              }
                            >
                              Update
                            </Button>
                          </HStack>
                        </Flex>
                      </Box>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              );
            }
          )}
        </Accordion>

        {/* Add note button */}
        {!showAddNote ? (
          <Button
            mt={currentData?.attributes?.notes?.data?.length > 0 ? '20px' : ''}
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
              <HStack
              // ml='auto'
              >
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
                  isDisabled={editor?.isEmpty}
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

      <div ref={bottomDivRef}></div>
    </Flex>
  );
};

export default Notes;
