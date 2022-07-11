import { Block } from '../../modules';

import './Loading.css';

export class Loading extends Block {
  protected render(): string {
    return `
      <div class="loading">
        <div class="loading__circle"></div>
      </div>
    `;
  }
}

