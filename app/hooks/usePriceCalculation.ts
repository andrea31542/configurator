import { useState } from 'react';
import { ValidatedPromoCode } from '../types/types';

export type PriceHookReturn = {
  addService: (servicePrice: number) => void;
  subtractService: (servicePrice: number) => void;
  applyPromoCode: (newPromoCode: ValidatedPromoCode) => void;
  removePromoCode: () => void;
  price: number;
  discountAmount: number;
  validatedPromoCode: ValidatedPromoCode | null;
};

export const usePriceCalculation = (): PriceHookReturn => {
  const [price, setPrice] = useState<number>(0);
  const [validatedPromoCode, setValidatedPromoCode] =
    useState<ValidatedPromoCode | null>(null);

  const discountAmount = validatedPromoCode
    ? (price * validatedPromoCode.discountPercentage) / 100
    : 0;

  const addService = (servicePrice: number) => {
    setPrice((prevState) => prevState + servicePrice);
  };

  const subtractService = (servicePrice: number) => {
    setPrice((prevState) => prevState - servicePrice);
  };

  const applyPromoCode = (newPromoCode: ValidatedPromoCode) => {
    setValidatedPromoCode(newPromoCode);
  };

  const removePromoCode = () => {
    setValidatedPromoCode(null);
  };

  return {
    addService,
    subtractService,
    price,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    validatedPromoCode,
  };
};
