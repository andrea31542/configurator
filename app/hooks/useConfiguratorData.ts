import { useEffect, useMemo, useState } from 'react';
import { ValidatedPromoCode } from '../types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, FormSchemaType } from '../types/FormTypes';

export type ConfiguratorDataHookReturn = {
  form: ReturnType<typeof useForm<FormSchemaType>>;
  addServicePrice: (servicePrice: number) => void;
  removeServicePrice: (servicePrice: number) => void;
  applyPromoCode: (newPromoCode: ValidatedPromoCode) => void;
  removePromoCode: () => void;
  price: number;
  discount: number;
  validatedPromoCode: ValidatedPromoCode | null;
  discountedPrice: number;
};

export const useConfiguratorData = (): ConfiguratorDataHookReturn => {
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
      price: 0,
    },
  });
  const { setValue, watch } = form;
  const price = watch('price');
  const [validatedPromoCode, setValidatedPromoCode] =
    useState<ValidatedPromoCode | null>(null);
  const discount = useMemo(
    () =>
      validatedPromoCode
        ? (price * validatedPromoCode.discountPercentage) / 100
        : 0,
    [price, validatedPromoCode]
  );

  const discountedPrice = useMemo(() => {
    return price - discount;
  }, [price, discount]);

  const addServicePrice = (servicePrice: number) => {
    setValue('price', watch('price') + servicePrice);
  };

  const removeServicePrice = (servicePrice: number) => {
    setValue('price', watch('price') - servicePrice);
  };

  const applyPromoCode = (newPromoCode: ValidatedPromoCode) => {
    setValidatedPromoCode(newPromoCode);
  };

  const removePromoCode = () => {
    setValidatedPromoCode(null);
  };

  useEffect(() => {
    const subscription = watch((formValues) => {
      localStorage.setItem('formValues', JSON.stringify(formValues));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const savedValues = localStorage.getItem('formValues');
    if (savedValues) {
      const parsedValues: FormSchemaType = JSON.parse(savedValues);
      (Object.keys(parsedValues) as (keyof FormSchemaType)[]).forEach((key) => {
        setValue(key, parsedValues[key]);
      });
    }
  }, [setValue]);

  return {
    form,
    addServicePrice,
    removeServicePrice,
    price,
    applyPromoCode,
    removePromoCode,
    discount,
    validatedPromoCode,
    discountedPrice,
  };
};
