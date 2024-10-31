import { createTheme } from '@mui/material';
import { colors } from './colors';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-satoshi-regular), sans-serif',
    fontSize: 14,
    h1: {
      fontWeight: '400',
      fontSize: '42px',
      lineHeight: '1.1',
    },
    h2: {
      fontWeight: '400',
      fontSize: '32px',
      lineHeight: '1.3',
    },
    h3: {
      fontWeight: '400',
      fontSize: '24px',
      lineHeight: '1.4',
    },
    h4: {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '1.4',
    },
    h5: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '1.5',
    },
    h6: {
      //fontWeight: '400',
      // fontSize: '42px',
      lineHeight: '1.5',
    },
  },
  palette: {
    primary: {
      main: colors.primary[100],
      dark: colors.primary[200],
    },
    error: {
      main: colors.error,
    },
    background: {
      default: colors.background[100],
      paper: colors.background[200],
    },
    text: {
      primary: colors.base[100],
      secondary: colors.base[200],
    },
    grey: {
      100: colors.base[300],
      200: colors.base[400],
      300: colors.base[500],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            background: colors.background[300],
          },
        },
      },
    },
  },
});

export { theme };
