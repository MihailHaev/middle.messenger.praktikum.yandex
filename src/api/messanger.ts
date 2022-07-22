import { consoleLog } from '@/utils';

type Message = {
  content: string | number;
  type: string;
};

export class WebSocketMessanger {
  private _socket;

  constructor(userId: number, chatId: number, chatToken: string) {
    this._socket = new WebSocket(
      `${process.env.WEB_SOCKET_ENDPOINT}/${userId}/${chatId}/${chatToken}`,
    );
    this._socket.addEventListener('open', this.onOpen.bind(this));
    this._socket.addEventListener('message', this.onMessage.bind(this));
    this._socket.addEventListener('error', this.onError.bind(this));
    this._socket.addEventListener('close', this.onClose.bind(this));
  }

  send(payload: Message): void {
    this._socket?.send(JSON.stringify(payload));
  }

  onOpen(): void {
    window.store.dispatch({ messages: [] });
    this.send({
      content: '0',
      type: 'get old',
    });
  }

  onMessage(event: MessageEvent): void {
    let data = JSON.parse(event.data);

    if (data.type === 'user connected') {
      return;
    }

    if (Array.isArray(data)) {
      data = data.reverse();
    } else {
      data = [data];
    }
    const { messages } = window.store.getState();
    window.store.dispatch({ messages: [...(messages || []), ...data] });
  }

  onError(error: Event): void {
    consoleLog('Error: ', error);
  }

  onClose(event: CloseEvent): void {
    if (event.wasClean) {
      consoleLog('Connection closed');
    } else {
      consoleLog('Connection interrupted');
    }
    consoleLog(`Event code: ${event.code}`);
    consoleLog(`Event reason: ${event.reason}`);
  }
}
