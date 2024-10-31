import { flexColumn } from '@/app/theme/sharedStyle';
import { Box } from '@mui/material';
import SectionTitle from '../SectionTitle/SectionTitle';

interface SectionProps {
  children: React.ReactNode;
  title: string;
}

const Section = ({ children, title }: SectionProps) => {
  return (
    <Box sx={{ ...flexColumn, gap: '0.25rem', width: '100%' }}>
      <SectionTitle title={title} />
      {children}
    </Box>
  );
};

export default Section;
