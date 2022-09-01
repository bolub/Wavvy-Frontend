import {
  Box,
  Button,
  Tag,
  Wrap,
  WrapItem,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useCheckboxGroup,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { updateRecording } from '../../../API/recordings';
import { allTagsState } from '../../../recoil/tags';
import { TagsDatum } from '../../../utils/GeneralProps';
import Plus from '../../UI/Icons/Plus';
import CustomCheckbox from './CustomCheckbox';

interface Props {
  tags: any;
  id?: string | number;
  action?: any;
}

export const ViewAddTags: FC<Props> = ({ tags, id, action }) => {
  const initialFocusRef = React.useRef();

  const [hook, setHook] = useState(false);

  const queryClient = useQueryClient();

  const mappedData = tags?.data?.map((tagData: any) => {
    return JSON.stringify({
      label: tagData?.id,
      value: tagData?.attributes?.title,
    });
  });

  const { value, getCheckboxProps, onChange } = useCheckboxGroup({
    defaultValue: mappedData ?? [],
  });

  const [allTags, setAllTags] = useRecoilState(allTagsState);

  const memoTags = useMemo(() => {
    return allTags;
  }, [tags]);

  const searchTags = (value: string) => {
    if (!value) {
      setAllTags(memoTags);

      return;
    }

    const filteredTags = allTags?.filter((tagData: TagsDatum) => {
      return tagData?.attributes?.title
        ?.toLowerCase()
        .includes(value.toLowerCase());
    });

    setAllTags(filteredTags);
  };

  //
  const { mutate } = useMutation(updateRecording, {
    onSuccess() {
      queryClient.invalidateQueries(['recordings']);
    },
  });

  const addTagToRecording = () => {
    const dataToSend = value?.map((tagData: any) => {
      return JSON.parse(tagData)?.label;
    });

    if (action) {
      action(dataToSend);
    } else {
      mutate({
        id,
        data: {
          tags: dataToSend,
        },
      });
    }
  };

  useEffect(() => {
    if (!hook) return;

    addTagToRecording();

    return () => {
      setHook(false);
    };
  }, [value]);

  return (
    <Box>
      <Wrap spacingX={'10px'}>
        {value?.map((tagData: any) => {
          return (
            <WrapItem key={tagData}>
              <Tag
                size='sm'
                fontWeight={'medium'}
                colorScheme={'gray'}
                borderRadius='full'
              >
                {JSON.parse(tagData)?.value}
              </Tag>
            </WrapItem>
          );
        })}
      </Wrap>

      {/* @ts-ignore */}
      <Popover placement='bottom-start' initialFocusRef={initialFocusRef}>
        <PopoverTrigger>
          <Button
            mt={value?.length > 0 ? '10px' : ''}
            variant={'ghost'}
            size='sm'
            pl={1}
            fontWeight={'semibold'}
            leftIcon={<Plus />}
            iconSpacing='2px'
            colorScheme={'gray'}
          >
            Add tags
          </Button>
        </PopoverTrigger>
        <PopoverContent w='220px'>
          <PopoverBody pt={0} px={0}>
            <Input
              //  @ts-ignore
              ref={initialFocusRef}
              placeholder='Search label'
              variant={'unstyled'}
              px='14px'
              py='8px'
              borderBottomWidth='1px'
              rounded='0'
              fontSize={'sm'}
              onChange={(e) => {
                searchTags(e.target.value);
              }}
            />

            {allTags?.map((tagData: TagsDatum) => {
              return (
                <CustomCheckbox
                  key={tagData.id}
                  {...getCheckboxProps({
                    value: JSON.stringify({
                      label: tagData.id,
                      value: tagData.attributes.title,
                    }),
                  })}
                  onChange={(e: any) => {
                    onChange(e);
                    setHook(true);
                  }}
                />
              );
            })}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
