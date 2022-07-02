import { Block } from '../../modules';
import { InputTypes } from '../../components';
import { logInputsData, VALUE_VALIDATOR_TYPES } from '../../utils';

import './settings.css';

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
    placeholder: 'Аватар',
    id: 'avatar',
    validationRule: VALUE_VALIDATOR_TYPES.required,
  },
  {
    placeholder: 'Старый пароль',
    id: 'oldPassword',
    type: InputTypes.password,
    validationRule: VALUE_VALIDATOR_TYPES.password,
  },
  {
    placeholder: 'Новый пароль',
    id: 'newPassword',
    type: InputTypes.password,
    validationRule: VALUE_VALIDATOR_TYPES.password,
  },
];

export class SettingsPage extends Block {
  constructor() {
    super({ inputs, handleClick: logInputsData });
  }

  render() {
    return `
      <div class="page-wrapper">
        {{{Title text="Настройки" className="settings-title"}}}
        {{#each inputs}}
          {{#with this}}
            {{{Input placeholder="{{placeholder}}" type="{{type}}" className="settings-input" validationRule="{{validationRule}}" id="{{id}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Сохранить" className="settings-button" onClick=handleClick}}}
      </div>
    `;
  }
}
