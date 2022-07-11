import { Router, Store, registerComponents, renderDOM } from './modules';
import { defaultState } from './store';
import { initRouter } from './routerr';
import { initApp } from './services';
import { LoginPage } from './pages/login';
import * as Сomponents from './components';

import './app.css';

registerComponents(Сomponents);

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store(defaultState);
  const router = new Router();

  /**
   * Помещаем роутер и стор в глобальную область для доступа в хоках with*
   * @warning Не использовать такой способ на реальный проектах
   */
  window.router = router;
  window.store = store;

  /**
   * Инициализируем роутер
   */

  renderDOM(new LoginPage({}), '#app');
  initRouter(router, store);

  /**
   * Загружаем данные для приложения
   */
  store.dispatch(initApp);
});
