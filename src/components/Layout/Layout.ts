import { Block } from '../../modules';

import './Layout.css';

export class Layout extends Block {
  protected render(): string {
    return `
      <div class="screen screen_theme_full">
        <div class="screen__header">
          <div class="screen__title">
            {{title}}
          </div>
        </div>
        <div class="screen__content" data-layout=1></div>
      </div>
    `;
  }
}
