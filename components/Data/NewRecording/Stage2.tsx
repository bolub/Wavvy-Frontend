import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { addRecording } from '../../../API/recordings';
import { allFoldersState } from '../../../recoil/folder';
import { tagsState } from '../../../recoil/tags';
import {
  CustomFolderData,
  FetchFoldersProps,
} from '../../../utils/GeneralProps';
import FormInput from '../../UI/Form/FormInput';
import SearchableSelect from '../../UI/Form/SearchableSelect';
import ChevronLeft from '../../UI/Icons/ChevronLeft';
import { ViewAddTags } from '../ViewAddTags';

interface durationProps {
  text: string;
  json: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface Props {
  setCurrentStage: Dispatch<SetStateAction<string>>;
  blobData: any;
  currentFolder: CustomFolderData;
  duration: durationProps;
  onClose: () => void;
  type: 'tag' | 'folder';
}

const Stage2: FC<Props> = ({
  setCurrentStage,
  blobData,
  currentFolder,
  duration,
  onClose,
  type,
}) => {
  const currentTag = useRecoilValue(tagsState);
  const allFolders = useRecoilValue(allFoldersState);

  const mappedFolders = allFolders?.map((folderData: FetchFoldersProps) => {
    return {
      label: folderData?.attributes?.name,
      value: folderData?.id,
    };
  });

  const [tags, setTags] = useState([currentTag]);
  const [title, setTitle] = useState('');
  const [folderIdWhenCreatingFromTag, setFolderIdWhenCreatingFromTag] =
    useState<string>('');

  const toast = useToast();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(addRecording, {
    onSuccess() {
      queryClient.invalidateQueries(['recordings']);
      onClose();

      toast({
        description: 'Added new recording',
        status: 'success',
      });
    },
  });

  const addRecordingHandler = () => {
    const dataToSend = {
      title,
      custom_folder:
        type === 'tag'
          ? folderIdWhenCreatingFromTag
          : currentFolder?.id?.toString(),
      userId: getCookie('USER_ID'),
      duration: duration?.text,
      durationJson: JSON.stringify(duration.json),
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

        <SimpleGrid columns={{ base: 1, md: 2 }} w='100%' spacing={8}>
          {/* folder */}
          {type === 'tag' && (
            <SearchableSelect
              label='Folder'
              options={mappedFolders}
              onChange={(selectedItem: { label: string; value: string }) => {
                setFolderIdWhenCreatingFromTag(selectedItem?.value);
              }}
            />
          )}

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
              <ViewAddTags
                id=''
                tags={type === 'tag' ? { data: tags } : {}}
                action={setTags}
              />
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>

      {/* Finish Button */}
      <Flex mb='24px' mt='8px'>
        <Button
          onClick={addRecordingHandler}
          isLoading={isLoading}
          ml='auto'
          size='sm'
          isDisabled={
            !title ||
            !blobData ||
            (type === 'tag'
              ? !folderIdWhenCreatingFromTag
              : !currentFolder?.id?.toString())
          }
        >
          Finish
        </Button>
      </Flex>
    </Box>
  );
};

export default Stage2;
