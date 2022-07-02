import { Block } from '../../modules';

import './serverError.css';

export class ServerErrorPage extends Block {
  render() {
    return `
      <div class="page-wrapper">
        {{{ErrorMessage code="500" text="Ошибка сервера"}}}
      </div>
    `;
  }
}
