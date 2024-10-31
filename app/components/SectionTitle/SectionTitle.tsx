import { Typography } from '@mui/material';

interface SectionTitle {
  title: string;
}

const SectionTitle = ({ title }: SectionTitle) => {
  return (
    <Typography
      variant='h4'
      color='primary'
      sx={{ alignSelf: 'flex-start' }}
      fontWeight={700}
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;
