'use client';
import { useEffect, useState } from 'react';
import { ServiceSteps, stepsFlow } from '../types/types';
import { getItem, setItem } from '../api/localstorage';

export const useStep = () => {
  const [activeStep, setActiveStep] = useState<ServiceSteps | null>(null);

  useEffect(() => {
    setActiveStep((getItem('activeStep') as ServiceSteps) ?? 'start');
  }, []);
  const totalSteps = stepsFlow.length;

  const isLastStep = stepsFlow[totalSteps - 1] === activeStep;
  const isFirstStep = stepsFlow[0] === activeStep;

  const nextStep = () => {
    const currentIndex = stepsFlow.findIndex((step) => step === activeStep);
    if (currentIndex === totalSteps - 1) {
    } else {
      setActiveStep(stepsFlow[currentIndex + 1]);
      setItem('activeStep', stepsFlow[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const currentIndex = stepsFlow.findIndex((step) => step === activeStep);
    if (currentIndex > 0) {
      setActiveStep(stepsFlow[currentIndex - 1]);
      setItem('activeStep', stepsFlow[currentIndex - 1]);
    }
  };

  return { activeStep, nextStep, previousStep, isLastStep, isFirstStep };
};
