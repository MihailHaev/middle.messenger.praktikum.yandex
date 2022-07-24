import { Block } from '@/modules/Block';

import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export class Button extends Block {
  constructor({ text, className, onClick }: ButtonProps) {
    super({ text, className, events: { click: onClick } });
  }

  protected render(): string {
    return `
        <button class="button{{#if className}} {{className}}{{/if}}" type="button">{{text}}</button>
    `;
  }
}
