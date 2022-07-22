/* eslint-disable no-empty */
import {
  chatsAPI,
  apiHasError,
  ChatsRequestData,
  ChatUsersRequestData,
  ChangedChatUsersRequestData,
} from '@/api';
import { consoleLog } from '@/utils';
import type { Dispatch } from '@/modules';

export const getChats = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action?: ChatsRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.getChats(action);

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
    const response = (await chatsAPI.getChats({})) as Chat[];

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
    const response = await chatsAPI.createChat({ title: action });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, createChatFormError: response.reason });
      return;
    }

    const responseChats = await chatsAPI.getChats();

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
    await chatsAPI.deleteChat({ chatId: action });

    const responseChats = await chatsAPI.getChats();

    dispatch({ isLoading: false, chats: responseChats });
  } catch (err) {}

  dispatch({ isLoading: false });
};

export const getChatUsers = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: ChatUsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.getChatUsers(action);

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
    const response = await chatsAPI.getChatNewMessagesCount(action);

    consoleLog('response: ', response);
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
    const response = await chatsAPI.changeChatAvatar(action);

    if (apiHasError(response)) {
      dispatch({ isLoading: false, changeChatAvatarFormError: response.reason });
      return;
    }

    consoleLog('response: ', response);
  } catch (err) {}

  dispatch({ isLoading: false });
};

export const addUsersToChat = async (
  dispatch: Dispatch<PlainObject>,
  state: AppState,
  action: ChangedChatUsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.addUsersToChat(action);

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
  action: ChangedChatUsersRequestData,
) => {
  dispatch({ isLoading: true });

  try {
    const response = await chatsAPI.deleteUsersFromChat(action);

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
    const { token } = await chatsAPI.getChatToken(action.chatId);

    dispatch({ isLoading: false, chatToken: token });
  } catch (err) {
    consoleLog('err: ', err);
    dispatch({ isLoading: false });
  }
};
