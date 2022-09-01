import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputProps,
  FormControlProps,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Box,
  TextareaProps,
  Textarea,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

interface FormInputProps {
  label: string;
  labelIcon?: any;
  for: string;
  type: string;
  helperText?: string;
  inputProps?: InputProps;
  textareaProps?: TextareaProps;
  formControlProps?: FormControlProps;
  rightElement?: any;
  listLabel?: string;
  listData?: string[];
  ref?: any;
}

const FormInput: FC<FormInputProps> = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl {...props.formControlProps}>
      <FormLabel
        fontWeight={'semibold'}
        fontSize='sm'
        color='gray.500'
        htmlFor={props.for}
        mb={1}
        display='flex'
      >
        <Text as='span'>{props.label}</Text>

        {props.labelIcon && (
          <Box ml='auto' my='auto'>
            {props.labelIcon}
          </Box>
        )}
      </FormLabel>

      <InputGroup size='md'>
        {props.type !== 'textarea' ? (
          <Input
            bg='white'
            h='40px'
            borderColor={'gray.300'}
            borderWidth='2px'
            rounded={'5px'}
            fontWeight='500'
            _placeholder={{
              color: 'gray.400',
              // fontWeight: 500,
            }}
            id={props.for}
            type={!show ? props.type : 'text'}
            list={props.listLabel}
            {...props.inputProps}
            ref={props?.ref}
          />
        ) : (
          <Textarea
            pt={4}
            bg='white'
            {...props.textareaProps}
            ref={props?.ref}
          />
        )}
        <datalist id={props.listLabel}>
          {props.listData?.map((value) => (
            <option key={value} value={value} />
          ))}
        </datalist>

        {(props.rightElement || props.type === 'password') && (
          <InputRightElement>
            {props.rightElement}

            {props.type === 'password' && (
              <Button
                size='sm'
                mt={0}
                mr={2}
                p={0}
                fontSize='lg'
                variant={'ghost'}
                onClick={handleClick}
                color='gray.400'
              >
                {show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </Button>
            )}
          </InputRightElement>
        )}
      </InputGroup>

      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormInput;
