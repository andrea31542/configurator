import axios from 'axios';
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

const parseResponse = <ResponseDataT,>(response: {
  data: any;
  status: number;
}): ApiResponse<ResponseDataT> => {
  if (validStatuses.includes(response.status)) {
    return { data: response.data, error: undefined };
  } else {
    if (response.data.message || response.data.cause) {
      return { data: undefined, error: response.data };
    }
    return { data: undefined, error: defaultError };
  }
};

export const getManufacturers = async (): Promise<
  ApiResponse<ManufacturerResponse>
> => {
  try {
    const res = await axiosApi.get(endpoints.manufacturers);
    return parseResponse<ManufacturerResponse>(res);
  } catch (error) {
    console.error(
      `Error get manufacturers at ${endpoints.manufacturers}`,
      error
    );
    return { data: undefined, error: defaultError };
  }
};

export const getServices = async (): Promise<ApiResponse<ServicesResponse>> => {
  try {
    const res = await axiosApi.get(endpoints.services);
    return parseResponse<ServicesResponse>(res);
  } catch (error) {
    console.error(`Error get services at ${endpoints.services}`, error);
    return { data: undefined, error: defaultError };
  }
};

export const validatePromoCode = async (
  promoCode: string
): Promise<ApiResponse<ValidatePromoCodeResponseType>> => {
  try {
    const res = await axiosApi.post(
      `${endpoints.promoCodeValidation}/${promoCode}`
    );
    return parseResponse<ValidatePromoCodeResponseType>(res);
  } catch (error) {
    console.error(`Error validate promo code at ${endpoints.services}`, error);
    return { data: undefined, error: defaultError };
  }
};

export const requestFinalQuote = async (
  request: ContactRequestType
): Promise<ApiResponse<ContactResponseType>> => {
  try {
    const res = await axiosApi.post(`${endpoints.contact}`, request);
    return parseResponse<ContactResponseType>(res);
  } catch (error) {
    console.error(`Error request final quote at ${endpoints.services}`, error);
    return { data: undefined, error: defaultError };
  }
};
