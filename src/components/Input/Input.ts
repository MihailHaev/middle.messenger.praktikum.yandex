import { Block } from '@/modules';

import './Input.css';

export const enum InputTypes {
  text = 'text',
  password = 'password',
  email = 'password',
  file = 'file',
}

interface InputProps {
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: InputTypes | string;
  value?: string;
  id?: string;
}

export class Input extends Block {
  constructor({
    onChange,
    onBlur,
    onFocus,
    type = InputTypes.text,
    value,
    id,
    ...props
  }: InputProps) {
    super({
      type: type || InputTypes.text,
      value,
      id,
      ...props,
      events: { input: onChange, blur: onBlur, focus: onFocus },
    });
  }

  protected render(): string {
    return `
      <input placeholder="{{placeholder}}" {{#if id}} id="{{id}}"{{/if}} class="input" type="{{type}}"{{#if value}} value="{{value}}"{{/if}}/>
    `;
  }
}
