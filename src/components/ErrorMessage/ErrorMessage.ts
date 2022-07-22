import { Block } from '@/modules/Block';

import './ErrorMessage.css';

interface ErrorMessageProps {
  [key: string]: string;
  code: string;
  text: string;
}

export class ErrorMessage extends Block<ErrorMessageProps> {
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
