import { Block } from './Block';

let currentBlock: Nullable<Block> = null;

export function renderDOM<T extends PlainObject>(block: Block<T>) {
  const root = document.querySelector('#app');

  currentBlock?.componentDidUnmount();
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  currentBlock = block as Block<PlainObject>;
}
