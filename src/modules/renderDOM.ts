import { Block } from './Block';

export function renderDOM(block: Block, selector: string) {
  const root = document.querySelector(selector);

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
}
