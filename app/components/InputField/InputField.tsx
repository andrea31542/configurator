import { colors } from '@/app/theme/colors';
import { InputLabel, Stack, TextField } from '@mui/material';

type InputFieldProps = {
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ value, onChange }: InputFieldProps) => {
  return (
    <Stack direction='column' spacing={2}>
      <InputLabel
        sx={{
          padding: '0 0.625rem',
          fontSize: '14px',
          color: colors.base[100],
        }}
      >
        Broj telefona
      </InputLabel>
      <TextField
        value={value}
        onChange={onChange}
        name='phone'
        size='small'
        variant='outlined'
        sx={{ marginTop: 0 }}
      />
    </Stack>
  );
};

export default InputField;
