import { Block } from '../../modules';
import { formateTime } from '../../utils';

import './Chat.css';

interface ChatProps {
  title: string;
  message: string;
  timestamp: number;
  id: number;
  unread_count: number;
  onClick: (id: number) => void;
}

export class Chat extends Block {
  constructor({ id, timestamp, onClick, ...props }: ChatProps) {
    const time = formateTime(timestamp);

    const handleClick = () => {
      onClick(id);
    };

    super({ time, ...props, events: { click: handleClick } });
  }

  protected render(): string {
    return `
      <div class="chat">
        <div class="chat-info">
          <span class="chat-info__name">{{title}}</span>
          {{#if message}}<span class="chat-info__message">{{message}}</span>{{/if}}
        </div>
        {{#if time}}<time class="chat__timestamp">{{time}}</time>{{/if}}
      </div>
    `;
  }
}
