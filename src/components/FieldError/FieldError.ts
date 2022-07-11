import { Block } from '../../modules';

import './FieldError.css';


export class FieldError extends Block {
  protected render(): string {
    return `
        <div class="field__error">{{errorText}}</div>
    `;
  }
}
