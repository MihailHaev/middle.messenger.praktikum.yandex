import { Block } from '../../modules';
import { InputTypes } from '../Input';

import './DefaultInput.css';

interface DefaultInputProps {
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  type?: InputTypes | string;
  value?: string;
  id?: string;
}

export class DefaultInput extends Block {
  constructor({
    onChange,
    onBlur,
    onFocus,
    type = InputTypes.text,
    value,
    id,
    ...props
  }: DefaultInputProps) {
    const correctType = type === '{{type}}' ? InputTypes.text : type;
    const currectValue = value === '{{value}}' ? '' : value;
    const currectId = id === '{{id}}' ? '' : id;

    super({
      type: correctType,
      value: currectValue,
      id: currectId,
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
