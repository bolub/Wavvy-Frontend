import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { FC, useState } from 'react';
import { createFolder } from '../../API/folders';
import FormInput from '../UI/Form/FormInput';

const NewFolder: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');

  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isLoading } = useMutation(createFolder, {
    onSuccess() {
      queryClient.invalidateQueries(['allFolders']);

      onClose();

      toast({
        description: 'Added new folder',
        status: 'success',
      });
    },
  });

  return (
    <Box px='24px'>
      <Box mt='32px'>
        {/* title input */}
        <FormInput
          type='text'
          label='Folder name'
          for='Folder name'
          inputProps={{
            placeholder: 'Folder name',
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

        <Flex my='24px'>
          <Button
            onClick={() => {
              mutate({
                name: title,
                userId: getCookie('USER_ID'),
              });
            }}
            isLoading={isLoading}
            size='sm'
            isDisabled={!title}
          >
            Add Folder
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default NewFolder;
