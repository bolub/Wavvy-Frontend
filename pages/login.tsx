import {
  Container,
  Flex,
  chakra,
  Box,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { loginOp } from '../API/auth';
import FormInput from '../components/UI/Form/FormInput';
import Logo from '../components/UI/Icons/Logo';
import { DASHBOARD_ROUTES } from '../utils/routes';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(loginOp, {
    onSuccess: (data) => {
      const { user, jwt } = data;

      toast({
        position: 'top-right',
        isClosable: true,
        description: 'Logged in successfully',
      });

      setCookie('USER_TOKEN', jwt, { maxAge: 604800 });
      setCookie('USER_ID', user.id, { maxAge: 604800 });
      setCookie('USER_AUTHENTICATED', 'true');
      setCookie('USER_NAME', user.username, { maxAge: 604800 });

      //  if (router?.query?.onboard === 'true') {
      //    window.location.href = `${DASHBOARD_ROUTES.BOARDS}?onboard=true`;
      //  } else {
      //    window.location.href = DASHBOARD_ROUTES.ANALYTICS;
      //  }

      window.location.href = `${DASHBOARD_ROUTES.FOLDER}/Uncategorized?uId=1`;
    },
    onError: (data: any) => {
      const errors = { ...data };

      toast({
        position: 'top-right',
        isClosable: true,
        description:
          errors?.response?.data?.error?.message || 'Something happened',
      });
    },
  });

  return (
    <Container maxW='7xl'>
      <Flex flexDir={'column'} pt={10} minH='100vh'>
        <Logo color='#3182CE' />

        <Box m='auto' w={'318px'}>
          <chakra.h1 color='gray.700' fontWeight={'black'} fontSize='2xl'>
            Login
          </chakra.h1>

          <chakra.form
            mt={6}
            onSubmit={(e) => {
              e.preventDefault();

              mutate({ identifier: email, password });
            }}
          >
            <VStack align={'start'} spacing={8} mb={5}>
              <FormInput
                type='email'
                label='Email'
                for='email'
                inputProps={{
                  placeholder: 'temisan@email.com',
                  onChange: (e) => {
                    setEmail(e.target.value);
                  },
                  value: email,
                }}
                formControlProps={{
                  isRequired: true,
                }}
              />

              <FormInput
                type='password'
                label='Password'
                for='password'
                inputProps={{
                  placeholder: '**********',
                  onChange: (e) => {
                    setPassword(e.target.value);
                  },
                  value: password,
                }}
                formControlProps={{
                  isRequired: true,
                }}
              />
            </VStack>

            <Flex>
              <chakra.a
                ml='auto'
                color='blue.500'
                fontWeight={'semibold'}
                fontSize='sm'
              >
                Forgot your password?
              </chakra.a>
            </Flex>

            <Button
              w='full'
              type='submit'
              mt={2}
              fontWeight='bold'
              isLoading={isLoading}
            >
              Login
            </Button>

            {/* <Flex mt={2}>
              <chakra.a
                mx='auto'
                color='blue.500'
                fontWeight={'semibold'}
                fontSize='sm'
              >
                Don't have an account?
              </chakra.a>
            </Flex> */}
          </chakra.form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
