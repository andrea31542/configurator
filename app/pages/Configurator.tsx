'use client';
import { useStep } from '@/app/hooks/useStep';
import { ServiceSteps } from '@/app/types/types';
import { Box, Button } from '@mui/material';
import { ReactNode } from 'react';
import ConfiguratorDetails from './ConfiguratorDetails';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import ConfiguratorHome from './ConfiguratorHome';
import { useConfiguratorData } from '@/app/hooks/useConfiguratorData';
import ConfiguratorPreview from './ConfiguratorPreview';
import ConfiguratorFinished from './SuccessfullyFinished';
import { requestFinalQuote } from '../api/api';
import useSnackbar from '../hooks/useSnackbar';

const Configurator = () => {
  const { activeStep, nextStep, previousStep } = useStep();
  const configuratorData = useConfiguratorData();
  const { form } = configuratorData;
  const { getValues, handleSubmit } = form;
  const [toast] = useSnackbar();

  const onSubmitFinalRequest = async () => {
    const formValues = getValues();
    const response = await requestFinalQuote({
      manufacturerId: formValues.manufacturerId,
      serviceIds: formValues.serviceIds,
      fullName: formValues.fullName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      note: formValues.note || null,
      promoCode: formValues.promoCode || null,
    });

    if (response.data) {
      nextStep();
      localStorage.removeItem('formValues');
    } else {
      toast({
        message: response.error?.message,
        title: response.error?.cause,
      });
    }
  };

  const handleNextStep = () => {
    localStorage.setItem('formValues', JSON.stringify(getValues()));
    nextStep();
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
        onClick={handleSubmit(handleNextStep)}
        sx={{ textTransform: 'none' }}
        fullWidth
      >
        Dalje
      </Button>
    ),
    preview: (
      <Box sx={{ ...flexRow, gap: '1.25rem', width: '100%' }}>
        <Button
          color='secondary'
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
    finish: (
      <Button color='secondary' onClick={() => location.reload()}>
        Započni novu prijavu
      </Button>
    ),
  };

  const renderSteps: Record<ServiceSteps, ReactNode> = {
    start: <ConfiguratorHome />,
    details: <ConfiguratorDetails configuratorDataHook={configuratorData} />,
    preview: <ConfiguratorPreview configuratorDataHook={configuratorData} />,
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
