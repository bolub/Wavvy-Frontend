import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Center, ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import DashLayout from '../components/Layout/DashLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../utils/routes';
import { RecoilRoot } from 'recoil';
import BottomPlayer from '../components/Data/BottomPlayer';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [isAuthRoute, setIsAuthRoute] = useState<boolean>(false);
  const [isDashboardRoute, setIsDashboardRoute] = useState<boolean>(false);

  const { pathname } = useRouter();

  useEffect(() => {
    for (const key in AUTH_ROUTES) {
      //@ts-ignore
      if (pathname.includes(AUTH_ROUTES[key])) {
        setIsAuthRoute(true);
        setIsDashboardRoute(false);
      }
    }

    for (const key in DASHBOARD_ROUTES) {
      //@ts-ignore
      if (pathname.includes(DASHBOARD_ROUTES[key])) {
        setIsDashboardRoute(true);
        setIsAuthRoute(false);
      }
    }
  }, [pathname]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecoilRoot>
            <ReactQueryDevtools initialIsOpen={false} />
            <Head>
              <title>Wavy</title>
            </Head>

            {show ? (
              <>
                {isDashboardRoute ? (
                  <>
                    <Navbar />

                    <DashLayout>
                      <Component {...pageProps} />
                    </DashLayout>

                    <BottomPlayer />
                  </>
                ) : (
                  <Component {...pageProps} />
                )}
              </>
            ) : (
              <Center h='100vh' w='full'>
                Loading...
              </Center>
            )}
          </RecoilRoot>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
