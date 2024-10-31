import CheckboxGroup from '@/app/components/CheckboxGroup/CheckboxGroup';
import Header from '@/app/components/Header/Header';
import CustomMaskedInput from '@/app/components/MaskInput/MaskInput';
import PriceContent from '@/app/components/PriceContent/PriceContent';
import CustomRadioGroup from '@/app/components/RadioGroup/CustomRadioGroup';
import Section from '@/app/components/Section/Section';
import Textfield from '@/app/components/Textfield/Textfield';
import { PriceHookReturn } from '@/app/hooks/usePriceCalculation';
import { useStore } from '@/app/store/store';
import { flexColumn, flexRow } from '@/app/theme/sharedStyle';
import { FormSchemaType } from '@/app/types/FormTypes';
import { ManufacturerType } from '@/app/types/types';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { validatePromoCode } from '../api/api';
import { useMemo } from 'react';

interface ConfiguratorDetailsProps {
  form: UseFormReturn<FormSchemaType>;
  priceHook: PriceHookReturn;
}

const ConfiguratorDetails = ({ form, priceHook }: ConfiguratorDetailsProps) => {
  const { setValue, watch, trigger } = form;
  const { manufacturers, services } = useStore();
  const manufacturerstList = manufacturers.map((manufacturer) => ({
    id: manufacturer.id,
    label: manufacturer.name,
    value: manufacturer.id,
  }));
  const watchManufacturerId = watch('manufacturerId');
  const watchServiceIds = watch('serviceIds');
  const {
    addService,
    subtractService,
    price,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    validatedPromoCode,
  } = priceHook;

  const handleManufacturerId = useCallback(
    (value: string) => {
      setValue('manufacturerId', value);
      trigger('manufacturerId');
    },
    [watchManufacturerId]
  );

  const handleUpdateServicesIds = useCallback(
    (id: string) => {
      const priceToChange =
        services.find((service) => service.id === id)?.price ?? 0;

      if (watchServiceIds?.includes(id)) {
        setValue(
          'serviceIds',
          watchServiceIds.filter((valueId) => valueId !== id)
        );
        subtractService(priceToChange);
      } else {
        setValue('serviceIds', [...watchServiceIds, id]);
        addService(priceToChange);
      }
      trigger('serviceIds');
    },
    [watchServiceIds]
  );

  const handleValidatePromoCode = async (
    promoCode: string
  ): Promise<boolean> => {
    const response = await validatePromoCode(promoCode);
    if (response.data && response.data.discountPercentage > 0) {
      applyPromoCode(response.data);
      setValue('promoCode', response.data?.code);
      return true;
    } else {
      setValue('promoCode', '');
      alert('Kod nije ispravan');
      return false;
    }
  };

  const handleRemovePromoCode = () => {
    removePromoCode();
  };

  const calculatedPrice = useMemo(() => {
    return price - discountAmount;
  }, [price, discountAmount]);

  return (
    <Box sx={{ ...flexColumn, gap: '1rem', width: '100%' }}>
      <Header />
      <Section title='Odaberite proizvođača vašeg vozila'>
        <CustomRadioGroup<ManufacturerType['id']>
          list={manufacturerstList}
          value={watchManufacturerId}
          setValue={handleManufacturerId}
          gridColumns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          errorMessage={form.formState.errors.manufacturerId?.message}
        />
      </Section>
      <Section title='Odaberite jednu ili više usluga koju trebate'>
        <CheckboxGroup
          list={services}
          value={watchServiceIds}
          setValue={handleUpdateServicesIds}
          gridColumns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
          errorMessage={form.formState.errors.serviceIds?.message}
        />
        <PriceContent
          promoCode={validatedPromoCode?.code}
          price={calculatedPrice}
          updatePromoCode={handleValidatePromoCode}
          removePromoCode={handleRemovePromoCode}
        />
      </Section>
      <Section title='Vaši podaci'>
        <Box
          sx={{ ...flexRow, justifyContent: 'space-between', gap: '1.5rem' }}
        >
          <Textfield<FormSchemaType>
            name='fullName'
            form={form}
            fullWidth
            placeholder='Unesite ime i prezime'
            label={'Ime i prezime'}
          />
          <CustomMaskedInput
            fullWidth
            form={form}
            name='phoneNumber'
            label='Broj telefona'
            mask='09#-###-####'
            definitions={{ '#': /[0-9]/ }}
          />
        </Box>
        <Textfield<FormSchemaType>
          name='email'
          form={form}
          fullWidth
          placeholder='Unesite email adresu'
          label={'Email adresa'}
        />
        <Textfield<FormSchemaType>
          name='note'
          form={form}
          fullWidth
          placeholder='Unesite email adresu'
          multiline
          minRows={4}
          maxRows={8}
          label={'Napomena'}
          optional
        />
      </Section>
    </Box>
  );
};

export default ConfiguratorDetails;
