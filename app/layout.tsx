import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from './components/Navbar/Navbar';
import ThemeRegistry from './theme/ThemeRegistry';
import { Box } from '@mui/material';

const satoshiVariable = localFont({
  src: './fonts/Satoshi-Variable.woff',
  variable: '--font-satoshi-variable',
  weight: '100',
});

const satoshiLight = localFont({
  src: './fonts/Satoshi-Light.woff',
  variable: '--font-satoshi-light',
  weight: '100',
});

const satoshiRegular = localFont({
  src: './fonts/Satoshi-Regular.woff',
  variable: '--font-satoshi-regular',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' style={{ height: '100vh' }}>
      <body
        className={`${satoshiVariable.variable} ${satoshiLight.variable} ${satoshiRegular.variable}`}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <ThemeRegistry options={{ key: 'mui' }}>
          <Navbar />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}