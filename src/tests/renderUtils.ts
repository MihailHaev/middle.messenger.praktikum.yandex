import { BlockClass, renderDOM, registerComponents, Store, Router } from '@/modules';
import { defaultState } from '../store';
import * as components from '../components';
import { initRouter } from '../router';
import { sleep } from '../utils';

type RenderBlockParams<T> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, unknown>>({
  Block,
  props,
  state = defaultState,
}: RenderBlockParams<T>) {
  registerComponents(components);

  const store = new Store({ ...defaultState, ...state });
  const router = new Router();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props as T));

  initRouter(router, store);

  await sleep();
}

export async function step(_name: string, callback: () => void) {
  await callback();
}
