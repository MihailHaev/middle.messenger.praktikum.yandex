import { HTTPTransport } from '../modules';
import { APIError } from './types';

// query
export type getRequestData = {
  offset?: number;
  limit?: number;
  title?: number;
};

export type CreateRequestData = {
  title: string;
};

export type DeleteRequestData = {
  chatId: number;
};

export type UsersRequestData = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type ChangeChatAvatarRequestData = {
  chatId: HTMLFormElement;
  avatar: HTMLFormElement;
};

export type ManipulateUsersRequestData = {
  users: number[];
  chatId: number;
};

type GetResponseData = Chat[];

type CreateResponseData = Nullable<APIError>;

type DeleteResponseData = {
  userId: number;
  result: {
    id: 123;
    title: string;
    avatar: string;
  };
};

type UsersResponseData = User[];

type getNewMessagesCountResponseData = {
  unread_count: number;
};

type ChangeAvatarResponseData = Chat | APIError;

type ManipulateUsersResponseData = Nullable<APIError>;

type getChatTokenResponse = {
  token: string;
};

const request = new HTTPTransport(`${process.env.API_ENDPOINT}/chats`);

export const chatsAPI = {
  get: (data?: getRequestData) => request.get<GetResponseData>('', { data }),

  create: (data: CreateRequestData) => request.post<CreateResponseData>('', { data }),

  delete: (data: DeleteRequestData) => request.delete<DeleteResponseData>('', { data }),

  getUsers: (data: UsersRequestData) =>
    request.get<UsersResponseData>(`/${data.id}/users`, { data }),

  getNewMessagesCount: (id: number) => request.get<getNewMessagesCountResponseData>(`/new/${id}`),

  changeAvatar: (data: FormData) =>
    request.put<ChangeAvatarResponseData>('/avatar', {
      data,
      headers: {},
    }),

  addUsers: (data: ManipulateUsersRequestData) =>
    request.put<ManipulateUsersResponseData>('/users', { data }),

  deleteUsers: (data: ManipulateUsersRequestData) =>
    request.delete<ManipulateUsersResponseData>('/users', { data }),
  getToken: (chatId: number) => request.post<getChatTokenResponse>(`/token/${chatId}`),
};
