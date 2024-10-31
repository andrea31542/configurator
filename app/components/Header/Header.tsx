import { Typography } from '@mui/material';

const Header = () => {
  return (
    <Typography
      variant='h2'
      fontWeight={'bold'}
      sx={{
        height: { sx: '4rem', md: '6.5rem' },
        alignSelf: { xs: 'center', sm: 'start' },
        alignContent: 'center',
      }}
    >
      Konfigurator Servisa
    </Typography>
  );
};

export default Header;
