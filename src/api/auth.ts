import { HTTPTransport } from '../modules';
import { APIError } from './types';

export type RegisterRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

type RegisterResponseData =
  | {
      id: number;
    }
  | APIError;

type LoginResponseData = null | APIError;

type MeResponseData = User | APIError;

const request = new HTTPTransport(`${process.env.API_ENDPOINT}/auth`);

export const authAPI = {
  register: (data: RegisterRequestData) => request.post<RegisterResponseData>('/signup', { data }),

  login: (data: LoginRequestData) => request.post<LoginResponseData>('/signin', { data }),

  me: () => request.get<MeResponseData>('/user'),

  logout: () => request.post('/logout'),
};
