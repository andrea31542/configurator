import { colors } from '@/app/theme/colors';
import { InputLabel, Stack, TextField, TextFieldProps } from '@mui/material';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export type TextfieldPropsType<FormSchema extends FieldValues> = {
  form: UseFormReturn<FormSchema>;
  name: Path<FormSchema>;
  optional?: boolean;
} & TextFieldProps;

const Textfield = <FormSchema extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  fullWidth,
  multiline,
  minRows = 2,
  maxRows = 4,
  optional = false,
}: TextfieldPropsType<FormSchema>) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <Stack width={fullWidth ? '100%' : 'auto'}>
      <InputLabel
        sx={{
          padding: '0 0.625rem',
          fontSize: '14px',
          color: colors.base[100],
        }}
      >
        {label}
        {optional && (
          <span style={{ color: colors.base[200] }}> (opcionalno)</span>
        )}
      </InputLabel>
      <TextField
        size='small'
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        {...register(name)}
        placeholder={placeholder}
        error={!!errors[name]}
        helperText={errors[name]?.message?.toString() ?? ' '}
      />
    </Stack>
  );
};

export default Textfield;
