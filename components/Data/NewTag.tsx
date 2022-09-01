import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import React, { useState } from 'react';
import { createTag } from '../../API/tags';
import FormInput from '../UI/Form/FormInput';

const NewTag = () => {
  const [title, setTitle] = useState('');

  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isLoading } = useMutation(createTag, {
    onSuccess() {
      queryClient.invalidateQueries(['allTags']);
      toast({
        description: 'Added new tag',
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
          label='Tag name'
          for='Tag name'
          inputProps={{
            placeholder: 'Tag name',
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
                title,
                userId: getCookie('USER_ID'),
              });
            }}
            isLoading={isLoading}
            size='sm'
            isDisabled={!title}
          >
            Add Tag
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default NewTag;
