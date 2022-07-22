import { Pages } from '../pages';

declare global {
  export type Nullable<T> = T | null | undefined;

  export type NullOrString = Nullable<string>;

  export type PlainObject<T = unknown> = Record<string, T>;

  export type Keys<T extends PlainObject> = keyof T;
  export type Values<T extends PlainObject> = T[Keys<T>];

  export type User = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Message = {
    chat_id: number;
    content: string;
    file: null;
    id: number;
    is_read: boolean;
    time: string;
    type: 'message';
    user_id: number;
  };

  export type Chat = {
    id: number;
    title: string;
    avatar: Nullable<string>;
    unread_count: number;
    created_by: number;
    last_message: Nullable<{
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      };
      time: string;
      content: string;
    }>;
  };

  export type AppState = {
    isAuthChecked: boolean;
    isLoading: boolean;
    page: Nullable<Pages>;
    user: Nullable<User>;
    messages: Nullable<Message[]>;
    chats: Nullable<Chat[]>;
    chat: Nullable<Chat>;
    chatUsers: Nullable<Users[]>;
    searchedUsers: Nullable<Users[]>;
    loginFormError: NullOrString;
    registerFormError: NullOrString;
    changePasswordFormError: NullOrString;
    avatarFormError: NullOrString;
    profileFormError: NullOrString;
    searchUsersFormError: NullOrString;
    createChatFormError: NullOrString;
    changeChatAvatarFormError: NullOrString;
    addUsersToChatFormError: NullOrString;
    removeUsersFromChatFormError: NullOrString;
    chatToken: NullOrString;
  };

  interface Window {
    store: Store<AppState>;
    router: Router;
  }
}

export {};
