import { LoginPage } from './login';
import { RegisterPage } from './register';
import { ChatPage } from './chat';
import { ChatsPage } from './chats';
import { SettingsPage } from './settings';
import { NotFoundPage } from './notFound';
import { ServerErrorPage } from './serverError';
import { BlockClass } from '../modules';

export enum Pages {
  Login = 'login',
  Register = 'register',
  Chats = 'chats',
  Chat = 'chat',
  Settings = 'settings',
  NotFound = 'notFound',
  ServerError = 'serverError',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pagesMap: Record<Pages, BlockClass<any>> = {
  [Pages.Login]: LoginPage,
  [Pages.Register]: RegisterPage,
  [Pages.Chats]: ChatsPage,
  [Pages.Chat]: ChatPage,
  [Pages.Settings]: SettingsPage,
  [Pages.NotFound]: NotFoundPage,
  [Pages.ServerError]: ServerErrorPage,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPageComponent = (page: Pages): BlockClass<any> => {
  return pagesMap[page];
};
