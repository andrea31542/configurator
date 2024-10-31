import Header from '@/app/components/Header/Header';
import ContactTable from '@/app/components/PreviewContent/ContactTable';
import SelectedServices from '@/app/components/PreviewContent/SelectedServicesTable';
import Section from '@/app/components/Section/Section';
import { useStore } from '@/app/store/store';
import { colors } from '@/app/theme/colors';
import { flexColumn } from '@/app/theme/sharedStyle';
import { FormSchemaType } from '@/app/types/FormTypes';
import { Box } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { PriceHookReturn } from '../hooks/usePriceCalculation';
import { useMemo } from 'react';

type ConfiguratorPreviewProps = {
  form: UseFormReturn<FormSchemaType>;
  priceHook: PriceHookReturn;
};

const ConfiguratorPreview = ({ form, priceHook }: ConfiguratorPreviewProps) => {
  const { manufacturers, services } = useStore();
  const { price, discountAmount, validatedPromoCode } = priceHook;
  const { getValues, watch } = form;
  const vehicle =
    manufacturers.find(
      (manufacture) => manufacture.id === getValues('manufacturerId')
    )?.name ?? '';
  const contactRows = [
    { leftValue: 'Ime i prezime', rightValue: getValues('fullName') },
    { leftValue: 'Email adresa', rightValue: getValues('email') },
    { leftValue: 'Broj telefona', rightValue: getValues('phoneNumber') },
    {
      leftValue: 'Napomena',
      rightValue: getValues('note') || 'Nema napomene',
    },
  ];

  const discount =
    discountAmount > 0
      ? useMemo(
          () => ({
            amount: discountAmount,
            percentage: validatedPromoCode?.discountPercentage,
          }),
          [discountAmount, validatedPromoCode]
        )
      : undefined;

  const selectedServices = useMemo(
    () =>
      services.filter((service) =>
        getValues('serviceIds').includes(service.id)
      ),
    [watch('serviceIds')]
  );

  return (
    <Box sx={{ ...flexColumn, gap: '1rem', width: '100%' }}>
      <Header />
      <Section title='Pregled i potvrda vašeg odabira'>
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, vratite se na prethodni korak. Kada ste
        provjerili ispravnost svojih podataka, za slanje upita na servis
        pritisnite gumb “Pošalji”.
      </Section>
      <Box
        sx={{
          bgcolor: colors.background[200],
          borderRadius: '0.625rem',
          padding: '1.5rem',
        }}
      >
        <Section title='Model vozila'>{vehicle}</Section>
        <Section title='Odabrane usluge'>
          <SelectedServices
            discount={discount}
            serviceList={selectedServices}
            total={price - discountAmount}
          />
        </Section>
        <Section title='Kontakt podaci'>
          <ContactTable rows={contactRows} />
        </Section>
      </Box>
    </Box>
  );
};

export default ConfiguratorPreview;
