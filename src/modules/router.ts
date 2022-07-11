import { BlockConstructable } from './registerComponent';

export const ROUTES: {
  [key: string]: string;
} = {
  onboarding: '/',
  auth: '/auth',
  register: '/register',
  chats: '/chats',
  settings: '/settings',
  notFound: '/404',
  serverError: '/500',
};

export const route = (pageRoutes: { [x: string]: BlockConstructable }): BlockConstructable => {
  return pageRoutes[window.location.pathname] || pageRoutes[ROUTES.notFound];
};
