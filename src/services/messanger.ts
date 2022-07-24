import { WebSocketMessanger } from '../api';
import type { Dispatch } from '../modules';

let messanger: Nullable<WebSocketMessanger> = null;

export const startMessanger = async (_dispatch: Dispatch<PlainObject>, state: AppState) => {
  const chatId = state.chat?.id;
  const userId = state.user?.id;
  const token = state.chatToken;

  if (!chatId || !userId || !token) {
    return;
  }

  messanger = new WebSocketMessanger(userId, chatId, token);
};

export const sendMessage = async (
  _dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: string,
) => {
  messanger?.send({
    content: action,
    type: 'message',
  });
};
