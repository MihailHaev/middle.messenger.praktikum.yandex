import { HTTPTransport } from '../modules';
import { APIError } from './types';

export type ChangedUserProfileRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangedUserPasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export type SearchedUsersRequestData = {
  login: string;
};

type ChangedUserResponseData = User | APIError;

type ChangedUserPasswordResponseData = null | APIError;

type SearchedUsersResponseData = User[] | APIError;

const httpTransport = new HTTPTransport(`${process.env.API_ENDPOINT}/user`);

export const userAPI = {
  changeUserProfile: (data: ChangedUserProfileRequestData) =>
    httpTransport.put<ChangedUserResponseData>('/profile', { data }),

  changeUserAvatar: (data: FormData) =>
    httpTransport.put<ChangedUserResponseData>('/profile/avatar', { data }),

  changeUserPassword: (data: ChangedUserPasswordRequestData) =>
    httpTransport.put<ChangedUserPasswordResponseData>('/password', { data }),

  getUser: (id: number) => httpTransport.get<User>(`/${id}`),

  searchUsers: (data: SearchedUsersRequestData) =>
    httpTransport.post<SearchedUsersResponseData>('/search', { data }),
};
