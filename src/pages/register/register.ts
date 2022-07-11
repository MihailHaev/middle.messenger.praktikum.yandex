import { Block } from '../../modules';
import { InputTypes } from '../../components';
import { logInputsData, VALUE_VALIDATOR_TYPES } from '../../utils';

import './register.css';

const inputs = [
  {
    placeholder: 'Имя',
    id: 'first_name',
    validationRule: VALUE_VALIDATOR_TYPES.name,
  },
  {
    placeholder: 'Фамилия',
    id: 'second_name',
    validationRule: VALUE_VALIDATOR_TYPES.name,
  },
  {
    placeholder: 'Логин',
    id: 'login',
    validationRule: VALUE_VALIDATOR_TYPES.login,
  },
  {
    placeholder: 'Почта',
    id: 'email',
    validationRule: VALUE_VALIDATOR_TYPES.email,
  },
  {
    placeholder: 'Телефон',
    id: 'phone',
    validationRule: VALUE_VALIDATOR_TYPES.phone,
  },
  {
    placeholder: 'Пароль',
    id: 'password',
    type: InputTypes.password,
    validationRule: VALUE_VALIDATOR_TYPES.password,
  },
  {
    placeholder: 'Повторите пароль',
    id: 'password_repeat',
    type: InputTypes.password,
    validationRule: VALUE_VALIDATOR_TYPES.password,
  },
];

export class RegisterPage extends Block {
  constructor() {
    super({ inputs, handleClick: logInputsData });
  }

  render() {
    return `
      <div class="page-wrapper">
        {{{Title text="Регистрация" className="register-title"}}}
        {{#each inputs}}
          {{#with this}}
            {{{Input placeholder="{{placeholder}}" type="{{type}}" className="register-input" validationRule="{{validationRule}}" id="{{id}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Войти" className="register-button" onClick=handleClick}}}
        {{{Link text="Есть аккаунт?" to="/register"}}}
      </div>
    `;
  }
}
