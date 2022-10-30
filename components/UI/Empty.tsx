import { Center, CenterProps, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props extends CenterProps {
  title?: string;
  children?: ReactElement;
}

const Empty = ({ title, children, ...centerProps }: Props) => {
  return (
    <Center flexDir={'column'} textAlign='center' {...centerProps}>
      <svg
        width='72'
        height='72'
        viewBox='0 0 72 72'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M36 59C48.7025 59 59 48.7025 59 36C59 23.2975 48.7025 13 36 13C23.2975 13 13 23.2975 13 36C13 48.7025 23.2975 59 36 59Z'
          fill='#EDF2F7'
        />
        <path
          d='M50.5951 41.6399C50.6071 43.1796 50.3113 44.7061 49.7251 46.1299C37.2351 49.1599 24.2951 46.4699 22.2351 45.9999C21.6763 44.6147 21.3943 43.1335 21.4051 41.6399H21.5151C21.5151 41.6399 36.3151 45.2299 50.4051 41.7099L50.5951 41.6399Z'
          fill='white'
        />
        <path
          d='M49.7249 46.13C47.9349 50.4 43.3749 53.36 36.0349 53.36C28.6249 53.36 24.0049 50.33 22.2349 46C24.2949 46.47 37.2348 49.16 49.7249 46.13Z'
          fill='#F2F2F2'
        />
        <path
          d='M36 59C48.7025 59 59 48.7025 59 36C59 23.2975 48.7025 13 36 13C23.2975 13 13 23.2975 13 36C13 48.7025 23.2975 59 36 59Z'
          stroke='#2A4157'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M50.5951 41.6399C50.6071 43.1796 50.3113 44.7061 49.7251 46.1299C37.2351 49.1599 24.2951 46.4699 22.2351 45.9999C21.6763 44.6147 21.3943 43.1335 21.4051 41.6399H21.5151C21.5151 41.6399 36.3151 45.2299 50.4051 41.7099L50.5951 41.6399Z'
          stroke='#2A4157'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M49.7249 46.13C47.9349 50.4 43.3749 53.36 36.0349 53.36C28.6249 53.36 24.0049 50.33 22.2349 46C24.2949 46.47 37.2348 49.16 49.7249 46.13Z'
          stroke='#2A4157'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M31.6939 32.4037C31.3226 31.5681 30.717 30.8582 29.9504 30.3599C29.1838 29.8616 28.2891 29.5964 27.3748 29.5964C26.4604 29.5964 25.5658 29.8616 24.7991 30.3599C24.0325 30.8582 23.4269 31.5681 23.0557 32.4037'
          stroke='#2A4157'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
        <path
          d='M48.9439 32.4037C48.5726 31.5681 47.967 30.8582 47.2004 30.3599C46.4338 29.8616 45.5391 29.5964 44.6248 29.5964C43.7104 29.5964 42.8158 29.8616 42.0491 30.3599C41.2825 30.8582 40.6769 31.5681 40.3057 32.4037'
          stroke='#2A4157'
          strokeWidth='2'
          strokeMiterlimit='10'
          strokeLinecap='round'
        />
      </svg>

      {title && (
        <Text fontSize='sm' color='gray.500' fontWeight={500}>
          {title}
        </Text>
      )}

      {children}
    </Center>
  );
};

export default Empty;
