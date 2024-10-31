'use client';

import { Box, Button, Chip, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { primary } from '@/app/theme/colors';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { validatePromoCode } from '@/app/api/api';

type CouponsContentProps = {
  coupon: string;
  updatePromoCode: (promoCode: string) => void;
};

const CouponsContent = ({ coupon, updatePromoCode }: CouponsContentProps) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [acceptedPromoCode, setAcceptedPromoCode] = useState('');
  const handleRemovePromoCode = () => {
    updatePromoCode('');
    setAcceptedPromoCode('');
  };
  const handleUpdatePromoCodeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPromoCodeInput(e.target.value);
  };

  const handleUpdatePromoCode = async () => {
    //napravi provjeru, ako nije validan da se onda ne moze ni dodati , a ako je validan da se onda izbrise i doda dolje u chip
    const response = await validatePromoCode(promoCodeInput);
    console.log('response', response);
    updatePromoCode(promoCodeInput);
    setAcceptedPromoCode(promoCodeInput);
    setPromoCodeInput('');
  };

  return (
    <Box
      sx={{ ...flexColumn, gap: '0.625rem', alignItems: { sm: 'flex-end' } }}
    >
      <Box sx={{ ...flexRow, gap: '0.625rem', alignSelf: { sm: 'flex-end' } }}>
        <TextField
          size='small'
          placeholder={'Unesi kod'}
          value={promoCodeInput}
          onChange={handleUpdatePromoCodeInput}
        />
        <Button
          aria-label='confirm'
          size='small'
          sx={{
            borderRadius: '0.25rem',
            color: 'white',
            bgcolor: primary,
            minWidth: '2.5rem',
          }}
        >
          <CheckIcon onClick={handleUpdatePromoCode} />
        </Button>
      </Box>
      {acceptedPromoCode && (
        <Chip
          sx={{
            alignSelf: 'flex-start',
          }}
          label={acceptedPromoCode}
          size='small'
          onDelete={handleRemovePromoCode}
          variant='outlined'
        />
      )}
    </Box>
  );
};

export default CouponsContent;
