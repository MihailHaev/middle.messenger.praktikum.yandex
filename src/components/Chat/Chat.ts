import { Block } from '../../modules';
import { formateTime } from '../../utils';

import './Chat.css';

interface ChatProps {
  name: string;
  message: string;
  timestamp: number;
}

export class Chat extends Block {
  constructor({ timestamp, ...props }: ChatProps) {
    const time = formateTime(timestamp);

    super({ time, ...props });
  }

  protected render(): string {
    return `
      <div class="chat">
        <div class="chat-info">
          <span class="chat-info__name">{{name}}</span>
          <span class="chat-info__message">{{message}}</span>
        </div>
        <span class="chat__timestamp">{{time}}</span>
      </div>
    `;
  }
}
