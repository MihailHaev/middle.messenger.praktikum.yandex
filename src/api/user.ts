import { HTTPTransport } from '../modules';
import { APIError } from './types';

export type ChangeProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangeUserAvatarRequestData = {
  avatar: FormData;
};

export type ChangePasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type SearchRequestData = {
  login: string;
};

type ChangeResponseData = User | APIError;

type ChangePasswordResponseData = null | APIError;

type SearchResponseData = User[] | APIError;

const request = new HTTPTransport(`${process.env.API_ENDPOINT}/user`);

export const userAPI = {
  changeProfile: (data: ChangeProfileRequestData) =>
    request.put<ChangeResponseData>('/profile', { data }),

  changeAvatar: (data: FormData) =>
    request.put<ChangeResponseData>('/profile/avatar', {
      data,
      headers: {},
    }),

  changePassword: (data: ChangePasswordRequestData) =>
    request.put<ChangePasswordResponseData>('/password', { data }),

  get: (id: number) => request.get<User>(`/${id}`),

  search: (data: SearchRequestData) => request.post<SearchResponseData>('/search', { data }),
};
