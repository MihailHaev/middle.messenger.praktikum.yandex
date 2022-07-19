import { InputTypes } from '../../components';
import { VALUE_VALIDATOR_TYPES } from '../../utils';

export const inputs = [
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
