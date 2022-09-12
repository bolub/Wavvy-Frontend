import {
  useCheckbox,
  chakra,
  Text,
  Icon,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import Checkmark from '../../UI/Icons/Checkmark';
import ETag from '../../UI/Icons/ETag';

const CustomCheckbox: FC<any> = (props) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display='flex'
      flexDirection='row'
      alignItems='center'
      gridColumnGap={2}
      // bg='green.50'
      // border='1px solid'
      // borderColor='green.500'
      // rounded='lg'
      px={3}
      py={1}
      cursor='pointer'
      _hover={{
        bg: 'gray.100',
      }}
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />

      <Icon as={ETag} active={state.isChecked} fontSize='24px' my='auto' />

      <Tooltip
        label={JSON.parse(props?.value)?.value}
        openDelay={800}
        fontSize='xs'
      >
        <Text
          as='span'
          fontSize={'sm'}
          ml='5px'
          color='gray.700'
          my='auto'
          mb='0.5'
          {...getLabelProps()}
          noOfLines={1}
        >
          {JSON.parse(props?.value)?.value}
        </Text>
      </Tooltip>

      <IconButton
        aria-label={`Toggle ${JSON.parse(props?.value)?.value}`}
        {...getCheckboxProps()}
        variant='unstyled'
        p={0}
        minW='auto'
        height='auto'
        icon={<Checkmark />}
        ml='auto'
        my='auto'
        visibility={!state.isChecked ? 'hidden' : 'visible'}
      />
    </chakra.label>
  );
};

export default CustomCheckbox;
