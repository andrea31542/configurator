import axios, { AxiosError } from 'axios';
import {
  ApiResponse,
  ContactRequestType,
  ContactResponseType,
  ErrorResponse,
  ManufacturerResponse,
  ServicesResponse,
  ValidatePromoCodeResponseType,
} from '../types/types';
import { endpoints } from './endpoints';

const baseApiPath = `${process.env.NEXT_PUBLIC_APP_URL}`;

const commonHeader = {
  'Content-Type': 'application/json',
  'x-authentication-token': process.env.NEXT_PUBLIC_APP_AUTHENTICATION_HEADER,
};

const axiosApi = axios.create({
  baseURL: baseApiPath,
  headers: {
    ...commonHeader,
  },
});
const validStatuses = [200, 201];

const defaultError: ErrorResponse = {
  message: 'An unexpected error occurred.',
  cause: 'Unknown error',
};

const handleAxiosError = (error: AxiosError): ErrorResponse => {
  if (error.response && error.response.data) {
    return (error.response.data as ErrorResponse) || defaultError;
  }
  return defaultError;
};

export const getManufacturers = async (): Promise<
  ApiResponse<ManufacturerResponse>
> => {
  try {
    const res = await axiosApi.get(endpoints.manufacturers);
    return validStatuses.includes(res.status)
      ? { data: res.data }
      : { error: defaultError };
  } catch (error) {
    console.log(`Error occurred during ${endpoints.manufacturers}`, error);
    return { error: handleAxiosError(error as AxiosError) };
  }
};

export const getServices = async (): Promise<ApiResponse<ServicesResponse>> => {
  try {
    const res = await axiosApi.get(endpoints.services);
    return validStatuses.includes(res.status)
      ? { data: res.data }
      : { error: defaultError };
  } catch (error) {
    console.log(`Error occurred during ${endpoints.services}`, error);
    return { error: handleAxiosError(error as AxiosError) };
  }
};

export const validatePromoCode = async (
  promoCode: string
): Promise<ApiResponse<ValidatePromoCodeResponseType>> => {
  try {
    const res = await axiosApi.post(
      `${endpoints.promoCodeValidation}/${promoCode}`
    );
    return validStatuses.includes(res.status)
      ? { data: res.data }
      : { error: defaultError };
  } catch (error) {
    console.log(
      `Error occurred during ${endpoints.promoCodeValidation}`,
      error
    );
    return { error: handleAxiosError(error as AxiosError) };
  }
};

export const requestFinalQuote = async (
  req: ContactRequestType
): Promise<ApiResponse<ContactResponseType>> => {
  try {
    const res = await axiosApi.post(`${endpoints.contact}`, req);
    return validStatuses.includes(res.status)
      ? { data: res.data }
      : { error: defaultError };
  } catch (error) {
    console.log(`Error occurred during ${endpoints.contact}`, error);
    return { error: handleAxiosError(error as AxiosError) };
  }
};
