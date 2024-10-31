'use client';
import { background, primary, text } from '@/app/theme/colors';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import { formatPrice } from '@/app/utils/utils';
import { Box, Button, Chip, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import CheckIcon from '@mui/icons-material/Check';

type PriceContent = {
  price: number;
  promoCode?: string | null;
  updatePromoCode: (promoCode: string) => Promise<boolean>;
  removePromoCode: () => void;
};

const PriceContent = ({
  price,
  promoCode,
  updatePromoCode,
  removePromoCode,
}: PriceContent) => {
  const [showPromoCode, setShowPromoCode] = useState(!!promoCode);
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [isValidPromo, setIsValidPromo] = useState<boolean | null>(null);

  const handlePromoCodeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPromoCodeInput(e.target.value);
    setIsValidPromo(null);
  };

  const handleUpdatePromoCode = async () => {
    const isValid = await updatePromoCode(promoCodeInput);
    if (isValid) setPromoCodeInput('');
    setIsValidPromo(isValid);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        backgroundColor: background,
        padding: '0.625rem 1rem',
        borderRadius: '0.25rem',
        gap: { xs: '1rem', sm: '3rem' },
      }}
    >
      <Box sx={{ ...flexRow, alignSelf: 'flex-start', gap: '0.625rem' }}>
        <Typography variant='h4' color={text.base}>
          Ukupno:
        </Typography>
        <Typography variant='h4' fontWeight='bold' color={primary}>
          {formatPrice(price)}
        </Typography>
      </Box>
      {showPromoCode ? (
        <Box
          sx={{
            ...flexColumn,
            gap: '0.625rem',
            alignItems: { sm: 'flex-end' },
          }}
        >
          <Box
            sx={{
              ...flexRow,
              gap: '0.625rem',
              alignSelf: { sm: 'flex-end' },
              alignItems: 'flex-start',
            }}
          >
            <TextField
              size='small'
              placeholder={'Unesi kod'}
              value={promoCodeInput}
              onChange={handlePromoCodeChange}
              error={isValidPromo === false}
              helperText={isValidPromo === false ? 'Invalid promo code' : ''}
            />
            <Button
              aria-label='confirm'
              size='large'
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
          {promoCode && (
            <Chip
              sx={{
                alignSelf: 'flex-start',
              }}
              label={promoCode}
              size='small'
              onDelete={removePromoCode}
              variant='outlined'
            />
          )}
        </Box>
      ) : (
        <Link
          underline='hover'
          onClick={() => setShowPromoCode(true)}
          sx={{ cursor: 'pointer' }}
        >
          {'Imam kupon'}
        </Link>
      )}
    </Box>
  );
};

export default PriceContent;
