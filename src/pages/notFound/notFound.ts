import { Block } from '../../modules';

import './notFound.css';

export class NotFoundPage extends Block {
  render() {
    return `
      <div class="page-wrapper">
        {{{ErrorMessage code="404" text="Страница не найдена"}}}
      </div>
    `;
  }
}
