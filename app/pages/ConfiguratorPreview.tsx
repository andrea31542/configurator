import Header from '@/app/components/Header';
import ContactTable from '@/app/components/ContactTable';
import SelectedServices from '@/app/components/SelectedServicesTable';
import Section from '@/app/components/Section';
import { useStore } from '@/app/store/store';
import { colors } from '@/app/theme/colors';
import { flexColumn } from '@/app/theme/sharedStyle';
import { Box } from '@mui/material';
import { ConfiguratorDataHookReturn } from '../hooks/useConfiguratorData';
import { useMemo } from 'react';

type ConfiguratorPreviewProps = {
  configuratorDataHook: ConfiguratorDataHookReturn;
};

const ConfiguratorPreview = ({
  configuratorDataHook,
}: ConfiguratorPreviewProps) => {
  const { manufacturers, services } = useStore();
  const { form, discount, validatedPromoCode, discountedPrice } =
    configuratorDataHook;
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

  const discountValues = useMemo(() => {
    if (discount > 0) {
      return {
        amount: discount,
        percentage: validatedPromoCode?.discountPercentage,
      };
    }
    return undefined;
  }, [discount, validatedPromoCode]);

  const selectedServices = useMemo(
    () =>
      services.filter((service) =>
        getValues('serviceIds').includes(service.id)
      ),
    [watch('serviceIds'), services]
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
          ...flexColumn,
          bgcolor: colors.background[200],
          borderRadius: '0.625rem',
          padding: '1.5rem',
          gap: '1rem',
        }}
      >
        <Section title='Model vozila'>{vehicle}</Section>
        <Section title='Odabrane usluge'>
          <SelectedServices
            discount={discountValues}
            serviceList={selectedServices}
            total={discountedPrice}
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
