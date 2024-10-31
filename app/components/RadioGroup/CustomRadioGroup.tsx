import { ResponsiveGridColumns } from '@/app/types/types';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
} from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { createGridTemplateColumns } from '@/app/utils/utils';
type CustomRadioButtonProp = {
  id: string | number;
  value: string | null;
  label: string;
};

type CustomRadioGroupProps<ValueType> = {
  list: CustomRadioButtonProp[];
  value: ValueType | null;
  setValue: (value: ValueType) => void;
  disabled?: boolean;
  gridColumns?: ResponsiveGridColumns;
  errorMessage?: string;
};

const CustomRadioGroup = <ValueType,>({
  list,
  value,
  setValue,
  disabled = false,
  gridColumns,
  errorMessage = '',
}: CustomRadioGroupProps<ValueType>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as ValueType);
  };
  return (
    <FormControl disabled={disabled} error={errorMessage.length > 0}>
      <RadioGroup
        name='radio-group'
        value={value ?? ''}
        onChange={handleChange}
        sx={{
          padding: '0.625rem',
          display: 'grid',
          gap: '0.625rem',
          gridTemplateColumns: gridColumns
            ? createGridTemplateColumns(gridColumns)
            : undefined,
        }}
      >
        {list.map((option) => (
          <FormControlLabel
            sx={{ minWidth: { md: '9.375rem' } }}
            key={option.id}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {errorMessage.length > 0 && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomRadioGroup;
