import { Block } from '@/modules';
import { formateTime } from '@/utils';

import './Chat.css';

interface ChatProps {
  title: string;
  message: string;
  timestamp: number;
  id: number;
  unreadCount: number;
  onClick: (id: number) => void;
  onRemoveClick: (id: number) => void;
}

export class Chat extends Block {
  constructor({ id, timestamp, onClick, onRemoveClick, ...props }: ChatProps) {
    const time = formateTime(timestamp);

    const handleClick = (event: Event) => {
      event.stopPropagation();
      onClick(id);
    };

    const handleRemovedClick = (event: Event) => {
      event.stopPropagation();
      onRemoveClick(id);
    };

    super({ time, onRemoveClick: handleRemovedClick, ...props, events: { click: handleClick } });
  }

  protected render(): string {
    return `
      <div class="chat">
        <div class="chat-info">
          <span class="chat-info__name">{{title}}</span>
          {{#if message}}<span class="chat-info__message">{{message}}</span>{{/if}}
        </div>
        {{#if time}}<time class="chat__timestamp">{{time}}</time>{{/if}}
        {{{Button className="chat__button" text="x" onClick=onRemoveClick}}}
      </div>
    `;
  }
}
