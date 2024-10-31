'use client';

import { flexColumn } from '@/app/theme/sharedStyle';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getManufacturers, getServices } from '@/app/api/api';
import { useStore } from '@/app/store/store';
import Configurator from './pages/Configurator';

const App = () => {
  const { setManufacturers, setServices } = useStore();

  useEffect(() => {
    (async () => {
      const manufacturers = await getManufacturers();
      setManufacturers(manufacturers.data ?? []);
      const services = await getServices();
      setServices(services.data ?? []);
    })();
  }, []);

  return (
    <Box
      sx={{
        ...flexColumn,
        flexGrow: 1,
      }}
    >
      <Configurator />
    </Box>
  );
};

export default App;
