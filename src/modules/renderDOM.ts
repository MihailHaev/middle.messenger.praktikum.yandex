import { Block } from './Block';

let currentBlock: Nullable<Block> = null;

export function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  currentBlock?.componentDidUnmount();
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  currentBlock = block;
}
