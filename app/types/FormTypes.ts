import { z } from 'zod';

export const FormSchema = z
  .object({
    manufacturerId: z
      .string()
      .min(1, { message: 'Odaberite proizvođača' })
      .default(''),
    serviceIds: z.array(z.string()).default([]),
    promoCode: z.string().optional(),
    fullName: z.string().min(1, { message: 'Unesite ime' }),
    email: z.string().email().min(1, { message: 'Unesite email' }),
    phoneNumber: z.string().min(1, { message: 'Unesite broj' }),
    note: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasValidManufacturer =
        data.manufacturerId !== null && data.manufacturerId.trim() !== '';
      return hasValidManufacturer;
    },
    {
      message: 'Potrebno je odabrati proizvođača vašeg vozila.',
      path: ['manufacturerId'],
    }
  )
  .refine(
    (data) => {
      const hasValidServices =
        data.serviceIds === null || data.serviceIds.length > 0;
      return hasValidServices;
    },
    {
      message: 'Potrebno je odabrati barem jednu uslugu koju trebate.',
      path: ['serviceIds'],
    }
  );
export type FormSchemaType = z.infer<typeof FormSchema>;
