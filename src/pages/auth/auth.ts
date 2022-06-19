import { Block } from '../../modules/Block';
import { InputTypes } from '../../components/Input';
import { logInputsData, VALUE_VALIDATOR_TYPES } from '../../utils';

import './auth.css';

const inputs = [
  {
    placeholder: 'Логин',
    id: 'login',
    validationRule: VALUE_VALIDATOR_TYPES.required,
  },
  {
    placeholder: 'Пароль',
    id: 'password',
    type: InputTypes.password,
    validationRule: VALUE_VALIDATOR_TYPES.required,
  },
];

export class AuthPage extends Block {
  constructor() {
    super({ inputs, handleClick: logInputsData });
  }

  render() {
    return `
      <div class="page-wrapper">
        {{{Title text="Авторизация" className="auth-title"}}}
        {{#each inputs}}
          {{#with this}}
            {{{Input placeholder="{{placeholder}}" type="{{type}}" className="auth-input" validationRule="{{validationRule}}" id="{{id}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Войти" className="auth-button" onClick=handleClick}}}
        {{{Link text="Нет аккаунта?" to="/register"}}}
      </div>
    `;
  }
}
