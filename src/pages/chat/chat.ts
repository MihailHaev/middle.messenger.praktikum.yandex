/* eslint-disable camelcase */
import { Block } from '../../modules';
import { VALUE_VALIDATOR_TYPES, getInputsData, connect } from '../../utils';
import {
  searchUsers,
  removeUsersFromChat,
  addUsersToChat,
  getChatUsers,
  getChat,
  getChatToken,
  startMessanger,
  sendMessage,
} from '../../services';
import { routes } from '../../router';

import './chat.css';

let isTokenGetted = false;
let isMessangerStarted = false;

export class ChatPageDefault extends Block {
  static componentName = `Chat Page`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    const chatId = Number(window.router.getHash());
    const chat = props.chat as Nullable<Chat>;

    window.store.dispatch(getChatUsers, { id: chatId });

    if (!chat || chatId !== chat.id) {
      window.store.dispatch(getChat, chatId);
    }

    super({ ...props });

    this.state = {
      ...this.state,
      handleUserChatClick: this.handleUserChatClick,
      handleClearSearch: this.handleClearSearch,
      handleSendMessage: this.handleSendMessage,
      handleLeaveChat: this.handleLeaveChat,
      handleSearch: this.handleSearch,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    if (newProps.user?.id && newProps.chat?.id && !isTokenGetted) {
      isTokenGetted = true;
      window.store.dispatch(getChatToken, { userId: newProps.user.id, chatId: newProps.chat.id });
    } else if (newProps.user?.id && newProps.chat?.id && newProps.token && !isMessangerStarted) {
      isMessangerStarted = true;
      window.store.dispatch(startMessanger);
    }
    return true;
  }

  handleUserChatClick = (id: number) => {
    const { isUserAdd, chat } = this.props;
    let userManupulation = null;
    if (isUserAdd) {
      userManupulation = addUsersToChat;
    } else {
      userManupulation = removeUsersFromChat;
    }
    window.store.dispatch(userManupulation, { chatId: chat.id, users: [id] });
  };

  handleSendMessage = () => {
    const objWithMessage = getInputsData([
      {
        id: 'message',
        validationRule: VALUE_VALIDATOR_TYPES.required,
      },
    ]);
    if (!objWithMessage) {
      return;
    }

    window.store.dispatch(sendMessage, objWithMessage.message);
  };

  handleLeaveChat = () => {
    const { chat, user } = this.props;
    window.store.dispatch(removeUsersFromChat, { chatId: chat.id, users: [user.id] });
  };

  handleSearch = () => {
    const searchData = getInputsData([
      {
        id: 'search',
        validationRule: VALUE_VALIDATOR_TYPES.required,
      },
    ]) as { search: string } | null;

    if (!searchData) {
      return;
    }

    window.store.dispatch(searchUsers, searchData.search);
  };

  handleClearSearch = () => {
    window.store.dispatch({ searchedUsers: [] });
  };

  render() {
    return `
    <div class="chat-page">
      {{#if isLoading}}{{{Loading  isLoading=isLoading }}}{{/if}}
      <div class="users-side">
        <div class="message-controls">
          {{{Field placeholder="Поиск" className="search-input" id="search"}}}
          {{{Button text="Найти" className="chat-page__button" onClick=handleSearch}}}
          {{{Button text="X" className="chat-page__button" onClick=handleClearSearch}}}
        </div>
        {{#each currentRenderUsers}}
          {{#with this}}
            {{{ChatUser id=id firstName=first_name secondName=second_name displayName=display_name role=role onClick=@root.handleUserChatClick isAdd=@root.isUserAdd}}}
          {{/with}}
        {{/each}}
        {{{Button text="Выйти из чата" onClick=handleLeaveChat}}}
        {{{Link text='Чаты' to="${routes.chats.path}" }}}
      </div>
      <div class="messages-side">
        <div class="messages-side__chat-info">
          <span class="chat-name">{{chatTitle}}</span>
          <span class="chat-online">{{usersCount}} участников</span>
        </div>
        <div class="messages-side__chat-inner">
          <div class="messages">
            {{#each messages}}
              {{#with this}}
                {{{Message content="{{content}}" isPersonal=isPersonal timestamp=timestamp}}}
              {{/with}}
            {{/each}}
          </div>
          <div class="message-controls">
            {{{Field placeholder="Сообщение" id="message" className="chat__input" validationRule="${VALUE_VALIDATOR_TYPES.name}"}}}
            {{{Button text="Отправить" className="chat-page__button" onClick=handleSendMessage}}}
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

const mapStateToProps = (state: AppState) => {
  const { chatUsers } = state;
  const searchedUsers = state.searchedUsers?.filter(
    ({ id }) => !chatUsers?.some(({ id: chatUserId }) => chatUserId === id),
  );
  const isUserAdd = Boolean(state.searchedUsers?.length);
  const currentRenderUsers = isUserAdd ? searchedUsers : chatUsers;

  return {
    isLoading: state.isLoading,
    isUserAdd,
    currentRenderUsers: currentRenderUsers?.filter((id) => id !== state?.user?.id),
    user: state.user,
    messages: state.messages?.map(({ content, is_read, time, user_id }) => ({
      content,
      timestamp: new Date(time).getTime(),
      isRead: is_read,
      isPersonal: user_id === state.user?.id,
    })),
    usersCount: chatUsers?.length,
    chat: state.chat,
    chatTitle: state.chat?.title,
    token: state.chatToken,
  };
};

export const ChatPage = connect(ChatPageDefault, mapStateToProps);
