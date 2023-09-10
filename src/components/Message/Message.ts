import { Block } from '@/modules/Block';
import { formateTime } from '@/utils';

import './Message.css';

interface MessageProps {
  content: string;
  isPersonal?: boolean;
  timestamp: number;
}

export class Message extends Block {
  constructor({ timestamp, isPersonal, ...props }: MessageProps) {
    const time = formateTime(timestamp);

    super({ time, isPersonal, ...props });
  }

  protected render(): string {
    return `
      <div class="message{{#if isPersonal}} messaage-personal{{/if}}">
        <span class="message__text">{{content}}</span>
        <time class="message__time">{{time}}</time>
      </div>
    `;
  }
}
