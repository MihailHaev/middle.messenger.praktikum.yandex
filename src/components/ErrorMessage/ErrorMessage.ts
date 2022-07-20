import { Block } from '@/modules/Block';

import './ErrorMessage.css';

interface ErrorMessageProps {
  code: string;
  text: string;
}

export class ErrorMessage extends Block {
  constructor(props: ErrorMessageProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="error-message">
        <span class="error-message__code">{{code}}</span>
        <span class="error-message__text">{{text}}</span>
      </div>
    `;
  }
}
