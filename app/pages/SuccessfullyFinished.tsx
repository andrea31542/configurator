'use client';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Breakpoint,
} from '@mui/material';
import SendMsg from '../../public/SendMsg.svg';
import { flexColumn } from '@/app/theme/sharedStyle';
import { useEffect } from 'react';
import { setItem } from '../api/localstorage';

const ConfiguratorFinished = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(
    theme.breakpoints.between('xs', 'md' as Breakpoint)
  );

  useEffect(() => {
    setItem('activeStep', 'start');
  }, []);

  return (
    <Box
      sx={{
        ...flexColumn,
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          padding: '2.5rem',
          ...flexColumn,
          alignItems: 'center',
          gap: '1.5rem',
          justifyContent: 'center',
        }}
      >
        <SendMsg />
        <Typography
          variant={isSmallScreen ? 'h4' : 'h2'}
          style={{ fontWeight: 'bold', textAlign: 'center' }}
          color='primary'
        >
          Konfigurator Servisa
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u
          najkraćem mogućem roku.
          <br /> Hvala vam!
        </Typography>
      </Box>
    </Box>
  );
};

export default ConfiguratorFinished;
