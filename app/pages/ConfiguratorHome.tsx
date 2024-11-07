'use client';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Breakpoint,
} from '@mui/material';
import StartIcon from '../../public/StartIcon.svg';
import { flexColumn } from '@/app/theme/sharedStyle';

const ConfiguratorHome = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(
    theme.breakpoints.between('xs', 'md' as Breakpoint)
  );

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
        <StartIcon aria-label='Start konfiguratora' />
        <Typography
          variant={isSmallScreen ? 'h3' : 'h2'}
          style={{ fontWeight: 'bold', textAlign: 'center' }}
          color='primary'
        >
          Konfigurator Servisa
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš
          <br /> stručan tim će vam se javiti u najkraćem mogućem roku.
        </Typography>
      </Box>
    </Box>
  );
};

export default ConfiguratorHome;
