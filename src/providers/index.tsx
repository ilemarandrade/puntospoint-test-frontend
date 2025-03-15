'use client';

import { env } from '@/root/env';
import theme from '@/root/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga4';

interface IProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: React.FC<IProps> = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize(env.GA_MEASUREMENT_ID);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
