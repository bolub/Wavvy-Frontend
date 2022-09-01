import { Box, Button, Flex, HStack, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react';
import { deleteFolder } from '../../API/folders';
import { deleteRecording } from '../../API/recordings';
import { deleteTag } from '../../API/tags';

interface Props {
  contentInfo: {
    name: string;
    id: string;
  };
  contentType: 'folder' | 'tag' | 'recording';
  onClose: () => void;
}

const DeleteFolderTag: FC<Props> = ({ contentInfo, contentType, onClose }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate, isLoading } = useMutation(deleteFolder, {
    onSuccess() {
      queryClient.invalidateQueries(['allFolders']);
      queryClient.invalidateQueries(['allRecordings']);

      toast({
        description: `Deleted ${contentInfo?.name}`,
        status: 'success',
      });
    },
  });

  const { mutate: deleteTagsHandler, isLoading: tagsloading } = useMutation(
    deleteTag,
    {
      onSuccess() {
        queryClient.invalidateQueries(['allTags']);
        queryClient.invalidateQueries(['allRecordings']);

        toast({
          description: `Deleted ${contentInfo?.name}`,
          status: 'success',
        });
      },
    }
  );

  const { mutate: deleteRecordingsHandler, isLoading: deleteloading } =
    useMutation(deleteRecording, {
      onSuccess() {
        queryClient.invalidateQueries(['allRecordings']);

        toast({
          description: `Deleted ${contentInfo?.name}`,
          status: 'success',
        });
      },
    });

  return (
    <Flex px='24px' mt='32px' flexDir={'column'}>
      <Text fontSize={'sm'}>
        Are you sure you want to delete{' '}
        <Text as='span' color='blue.500' fontWeight={'semibold'}>
          {contentInfo?.name}
        </Text>
        ?
      </Text>

      <HStack my='24px' ml='auto'>
        <Button size='sm' colorScheme={'gray'} onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (contentType === 'folder') {
              mutate({
                id: contentInfo?.id,
              });
            }

            if (contentType === 'tag') {
              deleteTagsHandler({
                id: contentInfo?.id,
              });
            }

            if (contentType === 'recording') {
              deleteRecordingsHandler({
                id: contentInfo?.id,
              });
            }
          }}
          isLoading={isLoading || tagsloading || deleteloading}
          size='sm'
        >
          Delete {contentType}
        </Button>
      </HStack>
    </Flex>
  );
};

export default DeleteFolderTag;
