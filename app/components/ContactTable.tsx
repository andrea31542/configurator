import { Box } from '@mui/material';
import { Row } from './SelectedServicesTable';
import { flexRow } from '@/app/theme/sharedStyle';

type ContactTableProps = {
  rows: { leftValue: string; rightValue: string | number }[];
};

const ContactTable = ({ rows }: ContactTableProps) => {
  return (
    <table>
      {rows.map((row, index) => (
        <Row
          sx={{ ...flexRow, justifyContent: 'flex-start', gap: '0.5rem' }}
          key={index}
          left={{ value: row.leftValue, props: { minWidth: '7rem' } }}
          right={{ value: row.rightValue }}
        />
      ))}
    </table>
  );
};

export default ContactTable;
