import { Center, chakra, Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import Logo from '../components/UI/Icons/Logo';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wavy</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main></main>
    </>
  );
};

export default Home;
