'use client';
import { useStep } from '@/app/hooks/useStep';
import { ContactRequestType, ServiceSteps } from '@/app/types/types';
import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';
import ConfiguratorDetails from './ConfiguratorDetails';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import ConfiguratorHome from './ConfiguratorHome';
import { useForm } from 'react-hook-form';
import { FormSchema, FormSchemaType } from '@/app/types/FormTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePriceCalculation } from '@/app/hooks/usePriceCalculation';
import ConfiguratorPreview from './ConfiguratorPreview';
import ConfiguratorFinished from './SuccessfullyFinished';
import { requestFinalQuote } from '../api/api';

const Configurator = () => {
  const { activeStep, nextStep, previousStep } = useStep();
  const priceHook = usePriceCalculation();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      manufacturerId: '',
      phoneNumber: '',
      promoCode: '',
      note: '',
      serviceIds: [],
    },
  });

  const onSubmitFinalRequest = async () => {
    const formValues = form.getValues();
    const response = await requestFinalQuote({
      ...formValues,
      promoCode: formValues.promoCode || null,
    } as ContactRequestType);

    if (response.data) {
      nextStep();
      localStorage.removeItem('formValues');
    }
  };

  const footerButtons: Record<Partial<ServiceSteps>, ReactNode> = {
    start: (
      <Button
        color='primary'
        variant='contained'
        onClick={nextStep}
        sx={{ textTransform: 'none', maxWidth: '12rem' }}
      >
        Pokreni konfigurator
      </Button>
    ),
    details: (
      <Button
        color='primary'
        variant='contained'
        onClick={form.handleSubmit(nextStep)}
        sx={{ textTransform: 'none' }}
        fullWidth
      >
        Dalje
      </Button>
    ),
    preview: (
      <Box sx={{ ...flexRow, gap: '1.25rem', width: '100%' }}>
        <Button
          color='primary'
          variant='outlined'
          onClick={previousStep}
          sx={{ textTransform: 'none' }}
        >
          Nazad
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={onSubmitFinalRequest}
          sx={{ textTransform: 'none' }}
          fullWidth
        >
          Pošalji
        </Button>
      </Box>
    ),
    finish: null,
  };

  const renderSteps: Record<ServiceSteps, ReactNode> = {
    start: <ConfiguratorHome />,
    details: <ConfiguratorDetails form={form} priceHook={priceHook} />,
    preview: <ConfiguratorPreview form={form} priceHook={priceHook} />,
    finish: <ConfiguratorFinished />,
  };

  return (
    <Box
      sx={{
        ...flexColumn,
        padding: {
          xs: '1rem 1rem',
          md: '1.5rem 3rem',
          lg: '2rem 15rem',
          xl: '2rem 19rem',
        },
        justifyContent:
          activeStep === 'start' || activeStep === 'finish'
            ? 'center'
            : 'flex-start',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          ...flexColumn,
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        {renderSteps[activeStep]}
        {footerButtons[activeStep]}
      </Box>
    </Box>
  );
};

export default Configurator;
