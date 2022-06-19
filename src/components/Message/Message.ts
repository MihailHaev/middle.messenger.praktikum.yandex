import { Block } from '../../modules/Block';
import { formateTime } from '../../utils';

import './Message.css';

interface MessageProps {
  text: string;
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
        <span class="message__text">{{text}}</span>
        <span class="message__time">{{time}}</span>
      </div>
    `;
  }
}
