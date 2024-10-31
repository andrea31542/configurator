import * as React from 'react';
import { IMaskInput } from 'react-imask';
import Stack from '@mui/material/Stack';
import { InputLabel, TextField, TextFieldProps } from '@mui/material';
import { colors } from '@/app/theme/colors';
import { FieldValues, UseFormReturn, Path } from 'react-hook-form';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
  definitions?: Record<string, RegExp>;
};

const MaskedInput = React.forwardRef<HTMLInputElement, CustomProps>(
  (props, ref) => {
    const { onChange, name, mask, definitions, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={mask}
        definitions={definitions}
        inputRef={ref}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
        overwrite
      />
    );
  }
);
MaskedInput.displayName = 'MaskedInput';

type MaskedInputProps<FormSchema extends FieldValues> = {
  form: UseFormReturn<FormSchema>;
  name: Path<FormSchema>;
  label?: string;
  mask: string;
  definitions?: Record<string, RegExp>;
} & TextFieldProps;

const CustomMaskedInput = <FormSchema extends FieldValues>({
  form,
  name,
  label,
  mask,
  definitions,
  fullWidth,
}: MaskedInputProps<FormSchema>) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <Stack direction='column' width={fullWidth ? '100%' : 'auto'}>
      {label && (
        <InputLabel
          sx={{
            padding: '0 0.625rem',
            fontSize: '14px',
            color: colors.base[100],
          }}
        >
          {label}
        </InputLabel>
      )}
      <TextField
        size='small'
        id={name}
        variant={'outlined'}
        {...register(name)}
        slotProps={{
          input: {
            inputComponent: MaskedInput as any,
            inputProps: {
              mask,
              definitions,
            },
          },
          inputLabel: { shrink: !!watch(name) },
        }}
        placeholder={`Unesite ${label?.toLowerCase()}`}
        sx={{ marginTop: '0px' }}
        error={!!errors[name]}
        helperText={errors[name]?.message?.toString() ?? ' '}
      />
    </Stack>
  );
};

export default CustomMaskedInput;
