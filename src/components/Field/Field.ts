import { Block } from '../../modules';
import { validateValue, VALUE_VALIDATOR_TYPES } from '../../utils';
import { InputTypes } from '../Input';

import './Field.css';

interface InputProps {
  placeholder: string;
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: InputTypes;
  value?: string;
  error?: string;
  className?: string;
  id?: string;
  validationRule?: Values<typeof VALUE_VALIDATOR_TYPES>;
}

export class Field extends Block {
  constructor(props: InputProps) {
    const { onChange, onBlur, onFocus = () => {}, validationRule } = props;
    let errorText = '';

    const handleBlur = (e: FocusEvent) => {
      const input = e.target as HTMLInputElement;
      const { value } = input;

      if (validationRule) {
        errorText = validateValue(value, validationRule);

        this.refs.error.setProps({ errorText });
      }
    };

    const handleChange = () => {
      this.refs.error.setProps({ errorText: '' });
    };

    super({
      errorText,
      onChange: onChange || handleChange,
      onBlur: onBlur || handleBlur,
      onFocus,
      ...props,
    });
  }

  protected render(): string {
    return `
        <div class="field{{#if className}} {{className}}{{/if}}">
            {{{Input
              id="{{id}}"
              class="input"
              type="{{type}}"
              value="{{value}}"
              placeholder="{{placeholder}}"
              onChange=onChange
              onBlur=onBlur
              onFocus=onFocus
            }}}
            {{{FieldError ref="error" errorText="{{errorText}}"}}}
        </div>
    `;
  }
}

