export class Router {
  private routes: Record<string, () => void> = {};

  private history: History = window.history;

  private isStarted = false;

  start() {
    if (this.isStarted) {
      return;
    }

    this.isStarted = true;
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  use(pathname: string, callback: () => void) {
    this.routes[pathname] = callback;

    return this;
  }

  _onRoute(pathname: string) {
    this._getRouteCallback(pathname)?.();
  }

  go(pathname: string, hash?: string) {
    this.history.pushState({}, '', pathname);
    if (hash) window.location.hash = `#${hash}`;
    this._onRoute(pathname);
  }

  back() {
    // проверить что позвращается после него
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  private _getRouteCallback(pathname: string): () => void | null {
    return this.routes[pathname] || this.routes['*'];
  }

  getPathName = (): string => window.location.pathname;

  getHash = (): string => window.location.hash.replace('#', '');
}
