import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Stack from '@mui/material/Stack';
import { InputLabel, TextField, TextFieldProps } from '@mui/material';
import { colors } from '@/app/theme/colors';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const PhoneMask = React.forwardRef<HTMLInputElement, CustomProps>(
  function CroatianPhoneMask(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask='09#-###-####'
        definitions={{
          '#': /[0-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
        overwrite
      />
    );
  }
);

type PhoneInputProps<FormSchema extends FieldValues> = {
  form: UseFormReturn<FormSchema>;
  name: Path<FormSchema>;
} & TextFieldProps;

const PhoneInput = <FormSchema extends FieldValues>({
  form,
  name,
  fullWidth,
}: PhoneInputProps<FormSchema>) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  return (
    <Stack direction='column' width={fullWidth ? '100%' : 'auto'}>
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
        size='small'
        id={name}
        variant={'outlined'}
        {...register(name)}
        slotProps={{
          input: {
            inputComponent: PhoneMask as any,
          },
          inputLabel: { shrink: !!watch(name) },
        }}
        placeholder='Unesite broj telefona'
        sx={{ marginTop: '0px' }}
        error={!!errors[name]}
        helperText={errors[name]?.message?.toString() ?? ' '}
      />
    </Stack>
  );
};

export default PhoneInput;
