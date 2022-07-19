import { Block } from '../../modules';
import { routes } from '../../router';

import './serverError.css';

export class ServerErrorPage extends Block {
  static componentName = 'Server Error';

  render() {
    const isAuthorized = Boolean(window.store.getState().user);

    return `
      <div class="page-wrapper">
        {{{ErrorMessage code="500" text="Ошибка сервера"}}}
        {{{Link text="${isAuthorized ? 'В чат' : 'Залогиниться'}" to="${
      isAuthorized ? routes.chats.path : routes.login.path
    }"}}}
      </div>
    `;
  }
}
