import { Block } from '../../modules';
import { VALUE_VALIDATOR_TYPES, logInputsData } from '../../utils';

import './chats.css';

const chats = [
  {
    name: 'Alexxx',
    message: 'test1',
    timestamp: 1655401269326,
  },
  {
    name: 'Mihhail',
    message: 'test1',
    timestamp: 1655401269326,
  },
];

const messages = [
  {
    text: 'test1',
    isPersonal: false,
    timestamp: 1655401338853,
  },
  {
    text: 'test2',
    isPersonal: true,
    timestamp: 1655401269326,
  },
];

export class ChatsPage extends Block {
  constructor() {
    super({
      chats,
      messages,
      handleClick: logInputsData,
    });
  }

  render() {
    return `
    <div class="chats">
      <div class="chats-side">
        {{{Input placeholder="Поиск" className="search-input"}}}
        {{#each chats}}
          {{#with this}}
            {{{Chat name="{{name}}" message="{{message}}" timestamp=timestamp}}}
          {{/with}}
        {{/each}}
      </div>
      <div class="messages-side">
        <div class="messages-side__chat-info">
          <span class="chat-name">Alexxx</span>
          <span class="chat-online">Онлайн</span>
        </div>
        <div class="messages-side__chat-inner">
          <div class="messages">
            {{#each messages}}
              {{#with this}}
                {{{Message text="{{text}}" isPersonal=isPersonal timestamp=timestamp}}}
              {{/with}}
            {{/each}}
          </div>
          <div class="message-controls">
            {{{Input placeholder="Сообщение" id="message" className="chat-input" validationRule="${VALUE_VALIDATOR_TYPES.name}"}}}
            {{{Button text="Отправить" className="chat-button" onClick=handleClick}}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}
