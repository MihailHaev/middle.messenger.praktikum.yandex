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
    // eslint-disable-next-line no-console
    console.log('Error: ', error);
  }

  onClose(event: CloseEvent): void {
    if (event.wasClean) {
      // eslint-disable-next-line no-console
      console.log('Connection closed');
    } else {
      // eslint-disable-next-line no-console
      console.log('Connection interrupted');
    }
    // eslint-disable-next-line no-console
    console.log(`Event code: ${event.code}`);
    // eslint-disable-next-line no-console
    console.log(`Event reason: ${event.reason}`);
  }
}
