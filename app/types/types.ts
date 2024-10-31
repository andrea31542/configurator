export type ServiceSteps = 'start' | 'details' | 'preview' | 'finish';

export const stepsFlow: ServiceSteps[] = [
  'start',
  'details',
  'preview',
  'finish',
];

export type ErrorResponse = {
  message: string;
  cause: string;
};

export type ApiResponse<DataType> = {
  data?: DataType;
  error?: ErrorResponse;
};

export type ManufacturerType = {
  id: string;
  name: string;
};

export type ManufacturerResponse = ManufacturerType[];

export type ServicesType = {
  id: string;
  name: string;
  price: number;
};

export type ServicesResponse = ServicesType[];

export type ResponsiveGridColumns = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

export type ContactRequestType = {
  manufacturerId: string;
  serviceIds: string[];
  promoCode: string | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  note: string;
};

export type ContactResponseType = ContactRequestType;

export type ValidatedPromoCode = {
  id: string;
  code: string;
  discountPercentage: number;
};

export type ValidatePromoCodeResponseType = ValidatedPromoCode;
