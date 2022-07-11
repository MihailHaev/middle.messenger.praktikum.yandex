import { HTTPTransport } from '../modules';
import { APIError } from './types';

export type RegisteredRequestData = {
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

type RegisteredResponseData =
  | {
      id: number;
    }
  | APIError;

type LoginResponseData = null | APIError;

type MeResponseData = User | APIError;

const httpTransport = new HTTPTransport(`${process.env.API_ENDPOINT}/auth`);

export const authAPI = {
  register: (data: RegisteredRequestData) =>
    httpTransport.post<RegisteredResponseData>('/signup', { data }),

  login: (data: LoginRequestData) => httpTransport.post<LoginResponseData>('/signin', { data }),

  me: () => httpTransport.get<MeResponseData>('/user'),

  logout: () => httpTransport.post('/logout'),
};

