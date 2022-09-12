import React, { FC, ReactElement, useState } from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import Left from './Left';

interface Props {
  children: ReactElement;
}

const DashLayout: FC<Props> = ({ children }) => {
  return (
    <Container maxW={'7xl'}>
      <Flex
        overflowY={{ base: 'unset', md: 'hidden' }}
        flexDir={{ base: 'column', md: 'row' }}
        mt='60px'
        mb='50px'
      >
        {/* Sidebar */}
        <Box display={{ base: 'none', md: 'block' }} w='295px'>
          <Left />
        </Box>

        <Box px={{ base: '0', md: '24' }} w='full'>
          {children}
        </Box>
      </Flex>
    </Container>
  );
};

export default DashLayout;
