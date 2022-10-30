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

import ETag from '../../UI/Icons/ETag';

import { ViewAddTags } from '../ViewAddTags';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAudio } from 'react-use';
import Play from '../../UI/Icons/Play';
import Pause from '../../UI/Icons/Pause';

import dayjs from 'dayjs';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { updateRecording } from '../../../API/recordings';
import Notes from './Notes';

const AudioData = ({ currentData }: any) => {
  // ============================== React Query ==============================
  const queryClient = useQueryClient();

  // update recording
  const { mutate } = useMutation(updateRecording, {
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

  const [newAudioInput, setNewAudioInput] = useState(
    currentData?.attributes?.title
  );

  useEffect(() => {
    setNewAudioInput(currentData?.attributes?.title);
  }, [currentData?.attributes?.title, setNewAudioInput]);

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
            {audio}

            <Box cursor='pointer'>
              <HStack spacing='7px'>
                {currentData && (
                  <Editable
                    display={'flex'}
                    value={newAudioInput}
                    onChange={(value) => {
                      setNewAudioInput(value);
                    }}
                    selectAllOnFocus={false}
                    submitOnBlur={false}
                    onSubmit={() => {
                      if (currentData?.attributes?.title === newAudioInput)
                        return;
                      if (!newAudioInput) return;

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
                    />

                    <EditableControls />
                  </Editable>
                )}

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
      <Notes currentData={currentData} />
    </>
  );
};

export default AudioData;
