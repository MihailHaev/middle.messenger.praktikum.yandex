import { InputTypes } from '@/components';
import { VALUE_VALIDATOR_TYPES } from '@/utils';

export const inputs = [
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
