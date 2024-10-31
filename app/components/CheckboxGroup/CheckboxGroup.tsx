import { primary } from '@/app/theme/colors';
import { ResponsiveGridColumns, ServicesType } from '@/app/types/types';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import { createGridTemplateColumns } from '@/app/utils/utils';

type CheckboxProps = ServicesType;

type CheckboxGroupProps<ValueType> = {
  list: CheckboxProps[];
  value: ValueType[];
  setValue: (value: ValueType) => void;
  gridColumns?: ResponsiveGridColumns;
  errorMessage?: string;
};

const CheckboxGroup = <ValueType,>({
  list,
  value,
  setValue,
  gridColumns,
  errorMessage,
}: CheckboxGroupProps<ValueType>) => {
  return (
    <Box>
      <FormGroup
        sx={{
          padding: '0.625rem',
          display: 'grid',
          gap: '0.625rem',
          gridTemplateColumns: gridColumns
            ? createGridTemplateColumns(gridColumns)
            : undefined,
        }}
      >
        {list.map((option) => {
          return (
            <FormControlLabel
              sx={{ minWidth: '12.5rem' }}
              key={option.id}
              control={
                <Checkbox
                  checked={value?.includes(option.id as ValueType)}
                  onChange={() => setValue(option.id as ValueType)}
                />
              }
              onChange={(e) => console.log('dlsakdas', e)}
              label={
                <>
                  {option.name}
                  <span style={{ color: primary }}>
                    {' '}
                    ({`${option.price}€`})
                  </span>
                </>
              }
            />
          );
        })}
      </FormGroup>
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </Box>
  );
};

export default CheckboxGroup;
