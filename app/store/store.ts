import { create } from 'zustand';
import { ManufacturerType, ServicesType } from '../types/types';
import { createJSONStorage, persist } from 'zustand/middleware';

type StoreType = {
  manufacturers: ManufacturerType[];
  setManufacturers: (manufacturers: ManufacturerType[]) => void;
  services: ServicesType[];
  setServices: (services: ServicesType[]) => void;
};

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      manufacturers: [],
      setManufacturers: (manufacturers: ManufacturerType[]) =>
        set(() => ({ manufacturers: manufacturers })),
      services: [],
      setServices: (services: ServicesType[]) =>
        set(() => ({ services: services })),
    }),
    {
      name: 'storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
