import { primary } from '@/app/theme/colors';
import { flexRow } from '@/app/theme/sharedStyle';
import { ServicesType } from '@/app/types/types';
import { formatPrice } from '@/app/utils/utils';
import {
  Box,
  Divider,
  SxProps,
  Theme,
  Typography,
  TypographyOwnProps,
} from '@mui/material';

type SelectedServicesProps = {
  serviceList: ServicesType[];
  discount?: { percentage?: number; amount: number };
  total: number;
};

type SideProps = {
  value: string | number;
  props?: TypographyOwnProps;
};

export type RowProps = {
  left: SideProps;
  right: SideProps;
  sx?: SxProps<Theme>;
};

export const Row = ({ left, right, sx }: RowProps) => (
  <Box sx={sx}>
    <Typography sx={left.props}>{left.value}</Typography>
    <Typography sx={right.props}>{right.value}</Typography>
  </Box>
);

const SelectedServices = ({
  serviceList,
  discount,
  total,
}: SelectedServicesProps) => {
  return (
    <tr>
      {serviceList.map((service) => {
        return (
          <td key={service.id}>
            <Row
              sx={{
                ...flexRow,
                padding: '0.5rem',
                justifyContent: 'space-between',
                gap: '0.5',
              }}
              left={{ value: service.name }}
              right={{ value: formatPrice(service.price) }}
            />
            <Divider sx={{ width: '100%' }} />
          </td>
        );
      })}
      {discount && (
        <Row
          sx={{
            ...flexRow,
            padding: '0.5rem',
            justifyContent: 'flex-end',
            gap: '2.5rem',
          }}
          left={{ value: `Popust ${discount.percentage}%:` }}
          right={{ value: `-${formatPrice(discount.amount)}` }}
        />
      )}
      <Row
        sx={{
          ...flexRow,
          padding: '0.5rem',
          justifyContent: 'flex-end',
          gap: '2.5rem',
        }}
        left={{ value: 'Ukupno:' }}
        right={{
          value: formatPrice(total),
          props: { variant: 'h4', fontWeight: 'bold', color: primary },
        }}
      />
    </tr>
  );
};

export default SelectedServices;
