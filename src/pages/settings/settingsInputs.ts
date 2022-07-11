import { InputTypes } from '../../components';
import { VALUE_VALIDATOR_TYPES, InputCreateData } from '../../utils';

export const profileInputs: InputCreateData[] = [
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
    placeholder: 'Отображаемое имя',
    id: 'display_name',
    validationRule: VALUE_VALIDATOR_TYPES.login,
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
];

export const avatarInput: InputCreateData = {
  placeholder: 'Аватар',
  id: 'avatar',
  validationRule: VALUE_VALIDATOR_TYPES.required,
  type: InputTypes.file,
};

export const passwordInputs: InputCreateData[] = [
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

