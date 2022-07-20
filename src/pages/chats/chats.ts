import { Block } from '@/modules';
import { VALUE_VALIDATOR_TYPES, getInputsData, connect } from '@/utils';
import { logout, getChats, createChat, deleteChat } from '@/services';
import { routes } from '@/router';

import './chats.css';

export class ChatsPageDefault extends Block {
  static componentName = 'Chats Page';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    window.store.dispatch(getChats);

    super({ ...props });

    this.state = {
      ...this.state,
      handleLogoutClick: this.handleLogoutClick,
      handleChatClick: this.handleChatClick,
      handleAddChat: this.handleAddChat,
      handleRemoveChat: this.handleRemoveChat,
    };
  }

  handleLogoutClick = () => {
    window.store.dispatch(logout);
  };

  handleAddChat = () => {
    const newChatData = getInputsData([
      {
        id: 'chat-title',
        validationRule: VALUE_VALIDATOR_TYPES.required,
      },
    ]) as { ['chat-title']: string } | null;

    if (!newChatData) {
      return;
    }

    window.store.dispatch(createChat, newChatData['chat-title']);
  };

  handleRemoveChat = (id: number) => {
    window.store.dispatch(deleteChat, id);
  };

  handleChatClick = (chatId: number) => {
    window.router.go(routes.chat.path, chatId);
  };

  render() {
    return `
    <div class="chats-page">
    {{#if isLoading}}{{{Loading  isLoading=isLoading }}}{{/if}}
      <div class="chats-side">
        <div class="message-controls">
          {{{Field placeholder="Добавить чат" className="search-input" id="chat-title"}}}
          {{{Button text="Добавить" className="chat-page__button" onClick=handleAddChat}}}
        </div>
        {{#each chats}}
          {{#with this}}
            {{{Chat id="{{id}}" title="{{title}}" message="{{message}}" unreadCount=unread_count onClick=@root.handleChatClick onRemoveClick=@root.handleRemoveChat}}}
          {{/with}}
        {{/each}}
        {{{Button text="Выйти" onClick=handleLogoutClick}}}
        {{{Link text='Настройки' to="${routes.settings.path}" }}}
      </div>
    </div>
    `;
  }
}
const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
  chats: state.chats,
});

export const ChatsPage = connect(ChatsPageDefault, mapStateToProps);
