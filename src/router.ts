import { Router, Store, renderDOM } from './modules';
import { getPageComponent, Pages } from './pages';

type Route = {
  path: string;
  shouldAuthorized?: boolean;
  shouldDoNotBeAuthorized?: boolean;
};

export const routes: Record<Pages, Route> = {
  [Pages.Login]: {
    path: '/',
    shouldDoNotBeAuthorized: true,
  },
  [Pages.Register]: {
    path: '/register',
    shouldDoNotBeAuthorized: true,
  },
  [Pages.Chats]: {
    path: '/chats',
    shouldAuthorized: true,
  },
  [Pages.Chat]: {
    path: '/chat',
    shouldAuthorized: true,
  },
  [Pages.Settings]: {
    path: '/settings',
    shouldAuthorized: true,
  },
  [Pages.ServerError]: {
    path: '/500',
  },
  [Pages.NotFound]: {
    path: '*',
  },
};

let isFirstAfterAuthChecked = true;

export function initRouter(router: Router, store: Store) {
  Object.entries(routes).forEach(([page, route]) => {
    router.use(route.path, () => {
      const { isAuthChecked } = store.getState();
      const isAuthorized = Boolean(store.getState().user);
      const isChatSelected = Boolean(router.getHash);
      const currentPage = store.getState().page as Nullable<Pages>;

      let pathToGo: NullOrString = null;
      let pageToDispatch: Nullable<Pages> = page as Pages;

      if (isAuthChecked && isFirstAfterAuthChecked) {
        if (isAuthorized && route.shouldDoNotBeAuthorized) {
          pathToGo = routes.chats.path;
          pageToDispatch = Pages.Chats;
        }

        if (!isAuthorized && route.shouldAuthorized) {
          pathToGo = routes.login.path;
          pageToDispatch = Pages.Login;
        }

        isFirstAfterAuthChecked = false;
      }

      if (!isChatSelected && pathToGo === routes.chat.path) {
        pathToGo = routes.chats.path;
        pageToDispatch = Pages.Chats;
      }

      if (currentPage && routes[currentPage].path === route.path) {
        pathToGo = null;
      }

      if (currentPage === page) {
        pageToDispatch = null;
      }

      if (pathToGo) {
        router.go(pathToGo);
      }
      if (pageToDispatch) {
        store.dispatch({ page: pageToDispatch });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState: AppState, nextState: AppState) => {
    if (nextState.isAuthChecked) {
      router.start();
    }

    if (prevState.page !== nextState.page && nextState.page != null) {
      const Page = getPageComponent(nextState.page);
      renderDOM(new Page({}), '#app');
      document.title = `App / ${Page.componentName}`;
    }
  });
}
