import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import DashLayout from '../components/Layout/DashLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '../utils/routes';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
          <Head>
            <title>Wavy</title>
          </Head>

          {isDashboardRoute ? (
            <>
              <Navbar />

              <DashLayout>
                <Component {...pageProps} />
              </DashLayout>
            </>
          ) : (
            <Component {...pageProps} />
          )}
        </RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
