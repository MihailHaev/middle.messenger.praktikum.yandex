import { Block } from './Block';

let currentBlock: Nullable<Block> = null;

export function renderDOM(block: Block, selector: string) {
  const root = document.querySelector(selector);

  currentBlock?.componentDidUnmount();
  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  currentBlock = block;
}
