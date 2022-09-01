import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { addRecording } from '../../../API/recordings';
import { CustomFolderData } from '../../../utils/GeneralProps';
import FormInput from '../../UI/Form/FormInput';
import ChevronLeft from '../../UI/Icons/ChevronLeft';
import { ViewAddTags } from '../ViewAddTags';

interface Props {
  setCurrentStage: Dispatch<SetStateAction<string>>;
  blobData: any;
  currentFolder: CustomFolderData;
  duration: string;
}

const Stage2: FC<Props> = ({
  setCurrentStage,
  blobData,
  currentFolder,
  duration,
}) => {
  const [tags, setTags] = useState([]);

  const [title, setTitle] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addRecording, {
    onSuccess() {
      queryClient.invalidateQueries(['recordings']);

      toast({
        description: 'Added new recording',
        status: 'success',
      });
    },
  });

  const addRecordingHandler = () => {
    const dataToSend = {
      title,
      custom_folder: currentFolder?.id?.toString(),
      userId: getCookie('USER_ID'),
      duration,
      tags,
    };

    const formData = new FormData();
    formData.append('files.audio', blobData);
    formData.append('data', JSON.stringify(dataToSend));

    mutate(formData);
  };

  return (
    <Box mt='24px'>
      {/* Back button */}
      <Button
        variant={'ghost'}
        display='flex'
        bg='gray.50'
        pl={1}
        size='sm'
        pr={2}
        onClick={() => {
          setCurrentStage('1');
        }}
      >
        <Icon as={ChevronLeft} fontSize='18px' />
        <Text fontSize={'sm'} fontWeight='semibold' ml='1px'>
          Back
        </Text>
      </Button>

      {/*  */}
      <VStack align={'start'} spacing='24px' mt='32px'>
        {/* title input */}
        <FormInput
          type='text'
          label='Title'
          for='title'
          inputProps={{
            placeholder: 'My Recording',
            fontSize: 'sm',
            value: title,
            onChange: (e) => {
              setTitle(e.target.value);
            },
          }}
          formControlProps={{
            isRequired: true,
          }}
        />

        {/* Tags */}
        <Box>
          {/* label */}
          <FormLabel
            fontWeight={'semibold'}
            fontSize='sm'
            color='gray.500'
            htmlFor='Tags'
            mb={1}
            display='flex'
          >
            Tags
          </FormLabel>

          {/* content */}
          <Box mt='12px'>
            <ViewAddTags id='' tags={tags} action={setTags} />
          </Box>
        </Box>
      </VStack>

      {/* Finish Button */}
      <Flex mb='24px' mt='8px'>
        <Button
          onClick={addRecordingHandler}
          isLoading={isLoading}
          ml='auto'
          size='sm'
          isDisabled={!title || !blobData}
        >
          Finish
        </Button>
      </Flex>
    </Box>
  );
};

export default Stage2;
