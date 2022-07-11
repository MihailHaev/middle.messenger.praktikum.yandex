import { HTTPTransport } from '../modules';
import { APIError } from './types';

export type ChatsRequestData = {
  offset?: number;
  limit?: number;
  title?: number;
};

export type NewChatRequestData = {
  title: string;
};

export type RemovedChatRequestData = {
  chatId: number;
};

export type ChatUsersRequestData = {
  id: number;
  offset?: number;
  limit?: number;
  name?: string;
  email?: string;
};

export type ChatAvatarRequestData = {
  chatId: HTMLFormElement;
  avatar: HTMLFormElement;
};

export type ChangedChatUsersRequestData = {
  users: number[];
  chatId: number;
};

type ChatsResponseData = Chat[];

type NewChatResponseData = Nullable<APIError>;

type RemovedChatResponseData = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
};

type ChatUsersResponseData = User[];

type ChatNewMessagesCountResponseData = {
  unread_count: number;
};

type ChatAvatarResponseData = Chat | APIError;

type ChangedChatUsersResponseData = Nullable<APIError>;

type ChatTokenResponse = {
  token: string;
};

const httpTransport = new HTTPTransport(`${process.env.API_ENDPOINT}/chats`);

export const chatsAPI = {
  getChats: (data?: ChatsRequestData) =>
    httpTransport.get<ChatsResponseData>('', data ? { data } : undefined),

  createChat: (data: NewChatRequestData) => httpTransport.post<NewChatResponseData>('', { data }),

  deleteChat: (data: RemovedChatRequestData) =>
    httpTransport.delete<RemovedChatResponseData>('', { data }),

  getChatUsers: ({ id }: ChatUsersRequestData) =>
    httpTransport.get<ChatUsersResponseData>(`/${id}/users`),

  getChatNewMessagesCount: (id: number) =>
    httpTransport.get<ChatNewMessagesCountResponseData>(`/new/${id}`),

  changeChatAvatar: (data: FormData) =>
    httpTransport.put<ChatAvatarResponseData>('/avatar', { data }),

  addUsersToChat: (data: ChangedChatUsersRequestData) =>
    httpTransport.put<ChangedChatUsersResponseData>('/users', { data }),

  deleteUsersFromChat: (data: ChangedChatUsersRequestData) =>
    httpTransport.delete<ChangedChatUsersResponseData>('/users', { data }),
  getChatToken: (chatId: number) => httpTransport.post<ChatTokenResponse>(`/token/${chatId}`),
};
