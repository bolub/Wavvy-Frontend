import Select from 'react-select';
import {
  FormControl,
  FormControlProps,
  FormLabel,
  VStack,
} from '@chakra-ui/react';

interface selectProps {
  defaultValue?: string;
  value?: any;
  isMulti?: boolean;
  options?: any;
  placeholder?: string;
  onChange?: any;
  label?: string;
  onBlur?: () => void;
  isFilter?: boolean;
  formControlProps?: FormControlProps;
}

const SearchableSelect = ({
  onChange,
  options,
  isMulti,
  value,
  defaultValue,
  placeholder,
  label,
  onBlur = () => {},
  isFilter = false,
  formControlProps,
}: selectProps) => {
  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      height: !isFilter ? '30px' : 'auto',
      width: '100%',
    }),

    control: (provided: any) => ({
      ...provided,
      borderColor: '#CBD5E0',
      borderRadius: '5px',
      borderWidth: !isFilter ? '2px' : '0px',
      fontSize: '0.9rem',
      outline: 0,
      paddingLeft: '8px',
      width: '100%',
      fontWeight: '500',
    }),

    container: (provided: any) => ({
      ...provided,
      height: '100%',
      outline: 0,
      fontSize: '0.9rem',
      paddingLeft: 0,
      width: '100%',
    }),

    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: 'none',
      outline: 0,
    }),

    ValueContainer: (provided: any) => ({
      ...provided,
      paddingLeft: 0,
      outline: 0,
    }),

    placeholder: (provided: any) => ({
      ...provided,
      fontWeight: 'semibold',
      color: '#9CA3AF',
    }),
  };

  return (
    <VStack align={'start'} w='100%' spacing={-1}>
      <FormControl {...formControlProps}>
        <FormLabel
          fontWeight={'semibold'}
          fontSize='sm'
          color='gray.500'
          mb={1}
          display='flex'
        >
          {label}
        </FormLabel>
        <Select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          options={options}
          defaultValue={defaultValue}
          styles={customStyles}
          isMulti={isMulti}
          onBlur={onBlur}
        />
      </FormControl>
    </VStack>
  );
};

export default SearchableSelect;
