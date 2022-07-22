/* eslint-disable camelcase */
import { Block } from '@/modules';
import { VALUE_VALIDATOR_TYPES, getInputsData, connect } from '@/utils';
import {
  searchUsers,
  removeUsersFromChat,
  addUsersToChat,
  getChatUsers,
  getChat,
  getChatToken,
  startMessanger,
  sendMessage,
} from '@/services';
import { routes } from '@/router';

import './chat.css';

let tokenGettedChatId: Nullable<number> = null;
let messangerStartedChatId: Nullable<number> = null;
let lastChatToken: NullOrString = null;

type ChatMessage = {
  content: string;
  timestamp: number;
  isRead: boolean;
  isPersonal: boolean;
};

type ChatProps = {
  isLoading: boolean;
  isUserAdd: boolean;
  currentRenderUsers: Nullable<User[]>;
  user: Nullable<User>;
  messages: Nullable<ChatMessage[]>;
  usersCount: Nullable<number>;
  chat: Nullable<Chat>;
  chatTitle: NullOrString;
  token: NullOrString;
};

export class ChatPageDefault extends Block<ChatProps> {
  static componentName = `Chat Page`;

  constructor(props: ChatProps) {
    const chatId = Number(window.router.getHash());
    const chat = props.chat as Nullable<Chat>;

    window.store.dispatch(getChatUsers, { id: chatId });

    if (!chat || chatId !== chat.id) {
      window.store.dispatch(getChat, chatId);
    }

    super({ ...props });

    this.setState({
      handleUserChatClick: this.handleUserChatClick,
      handleClearSearch: this.handleClearSearch,
      handleSendMessage: this.handleSendMessage,
      handleLeaveChat: this.handleLeaveChat,
      handleSearch: this.handleSearch,
    });
  }

  componentDidUpdate(_oldProps: ChatProps, newProps: ChatProps): boolean {
    const userId = newProps.user?.id;
    const chatId = newProps.chat?.id;
    const isChatAndUser = userId && chatId;
    const { token } = newProps;

    if (isChatAndUser && tokenGettedChatId !== chatId) {
      tokenGettedChatId = chatId;
      window.store.dispatch(getChatToken, { userId, chatId });
    } else if (isChatAndUser && token !== lastChatToken && messangerStartedChatId !== chatId) {
      messangerStartedChatId = chatId;
      lastChatToken = token;
      window.store.dispatch(startMessanger);
    }
    return true;
  }

  handleUserChatClick = (id: number) => {
    const { isUserAdd, chat } = this.props;
    if (!chat) {
      return;
    }
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
    if (!chat || !user) {
      return;
    }

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

const mapStateToProps = (state: AppState): ChatProps => {
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

export const ChatPage = connect<ChatProps>(ChatPageDefault, mapStateToProps);
