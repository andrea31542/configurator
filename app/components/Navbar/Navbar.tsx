'use client';
import { primary } from '@/app/theme/colors';
import { flexRow } from '@/app/theme/sharedStyle';
import {
  Box,
  Breakpoint,
  Typography,
  TypographyOwnProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const Navbar = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(
    theme.breakpoints.between('xs', 'md' as Breakpoint)
  );
  const isSmallScreen = useMediaQuery(
    theme.breakpoints.down('sm' as Breakpoint)
  );

  let variant;
  if (isSmallScreen) {
    variant = 'h4';
  } else if (isMediumScreen) {
    variant = 'h3';
  } else {
    variant = 'h2';
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: {
          sx: '3rem',
          md: '4.5rem',
        },
        bgcolor: primary,
        padding: {
          xs: '0.5rem 1rem',
          md: '1rem 3rem',
        },
        ...flexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant={variant as TypographyOwnProps['variant']}
        color='white'
        sx={{ fontWeight: 'bold' }}
      >
        Konfigurator servisa
      </Typography>
      <Typography variant='body1' color='white'>
        Izračunajte trošak servisa
      </Typography>
    </Box>
  );
};

export default Navbar;
