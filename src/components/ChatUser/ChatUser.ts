import { Block } from '@/modules';

import './ChatUser.css';

interface ChatProps {
  isAdd: boolean;
  id: number;
  firstName: string;
  secondName: string;
  displayName: string;
  role: string;
  avatar: string;
  onClick: (id: number) => void;
}

export class ChatUser extends Block {
  constructor({ id, isAdd, onClick, ...props }: ChatProps) {
    const handleClick = () => {
      onClick(id);
    };

    super({ ...props, symbol: isAdd ? '+' : 'x', onClick: handleClick });
  }

  protected render(): string {
    return `
      <div class="chat">
        <div class="chat-info">
          <span class="chat-info__name">{{firstName}} {{secondName}}</span>
          <span class="chat-info__message">{{role}}</span>
        </div>
        {{{Button text=symbol onClick=onClick }}}
      </div>
    `;
  }
}
