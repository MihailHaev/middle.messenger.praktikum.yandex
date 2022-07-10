import { Block } from '../../modules';
import { routes } from '../../router';

import './notFound.css';

export class NotFoundPage extends Block {
  static componentName = 'Page not found';

  render() {
    const isAuthorized = Boolean(window.store.getState().user);

    return `
      <div class="page-wrapper">
        {{{ErrorMessage code="404" text="Страница не найдена"}}}
        {{{Link text="${isAuthorized ? 'В чат' : 'Залогиниться'}" to="${
      isAuthorized ? routes.chats.path : routes.login.path
    }"}}}
      </div>
    `;
  }
}
