import { Block } from '@/modules/Block';

import './Title.css';

export class Title extends Block {
  render() {
    return `
    <div class="title{{#if className}} {{className}}{{/if}}">
      <span class="title__text">{{text}}</span>
    </div>
    `;
  }
}
