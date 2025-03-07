'use client';

import theme from '@/root/theme';
import { ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

const Providers: React.FC<IProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Providers;
