import { Block } from '../../modules';

import './Link.css';

export interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClick = (e: MouseEvent) => {};

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `<a class="link{{#if className}} {{className}}{{/if}}" href="{{to}}">{{text}}</a>`;
  }
}
