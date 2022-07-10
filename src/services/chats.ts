/* eslint-disable no-empty */
import {
  chatsAPI,
  apiHasError,
  getRequestData,
  UsersRequestData,
  ManipulateUsersRequestData,
} from '../api';
import type { Dispatch } from '../modules';
import type { PlainObject } from '../utils';

export const getChats = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action?: getRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.get(action);

    dispatch({ isLoading: false, chats: response });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const getChat = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  chatId: number,
) => {
  dispatch({ isLoading: true });

  try {
    const response = (await chatsAPI.get({})) as Chat[];

    const chat = response.find(({ id }) => id === chatId);

    dispatch({ isLoading: false, chat });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const createChat = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: string,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.create({ title: action });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, createChatFormError: response.reason });
      return;
    }

    const responseChats = await chatsAPI.get();

    dispatch({ isLoading: false, chats: responseChats });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const deleteChat = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: number,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.delete({ chatId: action });

    // eslint-disable-next-line no-console
    console.log('response: ', response);
  } catch (err) {}

  dispatch({ isLoading: false });
};

export const getChatUsers = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: UsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.getUsers(action);

    dispatch({ isLoading: false, chatUsers: response });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const getNewMessagesChatCount = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: number,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.getNewMessagesCount(action);

    // eslint-disable-next-line no-console
    console.log('response: ', response);
  } catch (err) {}

  dispatch({ isLoading: false });
};

export const changeChatAvatar = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: FormData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.changeAvatar(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, changeChatAvatarFormError: response.reason });
      return;
    }

    // eslint-disable-next-line no-console
    console.log('response: ', response);
  } catch (err) {}

  dispatch({ isLoading: false });
};

export const addUsersToChat = async (
  dispatch: Dispatch<PlainObject>,
  state: AppState,
  action: ManipulateUsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.addUsers(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, addUsersToChatFormError: response.reason });
      return;
    }

    const newChatUsers = state.searchedUsers?.filter(({ id }) => action.users.includes(id));
    const chatUsers = [...(state.chatUsers || []), ...(newChatUsers || [])];
    dispatch({ isLoading: false, chatUsers });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const removeUsersFromChat = async (
  dispatch: Dispatch<PlainObject>,
  state: AppState,
  action: ManipulateUsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.deleteUsers(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, removeUsersFromChatFormError: response.reason });
      return;
    }

    const chatUsers = state.chatUsers?.filter(({ id }) => !action.users.includes(id));

    dispatch({ isLoading: false, chatUsers });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const getChatToken = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: {
    chatId: number;
    userId: number;
  },
) => {
  dispatch({ isLoading: true });
  try {
    const { token } = await chatsAPI.getToken(action.chatId);

    dispatch({ isLoading: false, chatToken: token });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err: ', err);
    dispatch({ isLoading: false });
  }
};
