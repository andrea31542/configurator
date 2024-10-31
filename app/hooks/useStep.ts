'use client';
import { useState } from 'react';
import { ServiceSteps, stepsFlow } from '../types/types';

export const useStep = () => {
  const [activeStep, setActiveStep] = useState<ServiceSteps>('start');
  const totalSteps = stepsFlow.length;

  const isLastStep = stepsFlow[totalSteps - 1] === activeStep;
  const isFirstStep = stepsFlow[0] === activeStep;

  const nextStep = () => {
    const currentIndex = stepsFlow.findIndex((step) => step === activeStep);
    if (currentIndex === totalSteps - 1) {
    } else {
      setActiveStep(stepsFlow[currentIndex + 1]);
      localStorage.setItem('activeStep', stepsFlow[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const currentIndex = stepsFlow.findIndex((step) => step === activeStep);
    if (currentIndex > 0) {
      setActiveStep(stepsFlow[currentIndex - 1]);
      localStorage.setItem('activeStep', stepsFlow[currentIndex - 1]);
    }
  };

  return { activeStep, nextStep, previousStep, isLastStep, isFirstStep };
};
