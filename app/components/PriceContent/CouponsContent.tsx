'use client';

import { Box, Button, Chip, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { primary } from '@/app/theme/colors';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import { useState } from 'react';
import { ChangeEvent } from 'react';

type CouponsContentProps = {
  updatePromoCode: (promoCode: string) => void;
};

const CouponsContent = ({ updatePromoCode }: CouponsContentProps) => {
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

  const handleUpdatePromoCode = () => {
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
