import { Block } from '@/modules';
import './Link.css';

export interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      e.preventDefault();

      window.router.go(props.to);
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `<a class="link{{#if className}} {{className}}{{/if}}" href="{{to}}" on>{{text}}</a>`;
  }
}
