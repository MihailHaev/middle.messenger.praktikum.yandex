const nameRegExp = /^[A-ZА-Я][a-zа-я-]+$/iu;
const loginRegExp = /^[A-Za-z_-]+$/iu;
const emailRegExp = /^.+@.+\..+$/i;
const passwordNumberRegExp = /[0-9]/i;
const passwordUpperCaseRegExp = /[A-ZА-Я]/i;
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

export const VALUE_VALIDATOR_TYPES = {
  name: 'name',
  login: 'login',
  email: 'email',
  password: 'password',
  phone: 'phone',
  message: 'message',
  required: 'required',
};

enum ErrorMessage {
  noValue = 'Введите значение',
  nameNotUpperCase = 'Первая буква должна быть заглавной',
  nameNotFirstDefis = 'Первый символ не должен быть дефисом',
  nameNotValid = 'Латиница или кириллица, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  loginToSmall = 'Минимальное количество симвлов в логине 3',
  loginToBig = 'Максимальное количество симвлов в логине 20',
  loginNotOnlyNumbers = 'Логин может содержать цифры, но не состоять из них',
  loginNotValid = 'Латиница, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  emailNotValid = 'Введите корректный эмейл',
  passwordToSmall = 'Минимальное количество симвлов в пароле 8',
  passwordToBig = 'Максимальное количество симвлов в пароле 40',
  passwordToHaveNumber = 'В пароле должна быть цифра',
  passwordUpperCase = 'В пароле должна быть заглавная буква',
  phoneNotValid = 'Введите корректный номер телефона',
}

const nameValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  const firstSymbol = value.charAt(0);
  if (firstSymbol !== firstSymbol.toUpperCase()) return ErrorMessage.nameNotUpperCase;
  if (firstSymbol === '') return ErrorMessage.nameNotFirstDefis;
  if (!value.match(nameRegExp)) return ErrorMessage.nameNotValid;

  return '';
};

const loginValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  if (value.length < 3) return ErrorMessage.loginToSmall;
  if (value.length > 20) return ErrorMessage.loginToBig;
  if (!Number.isNaN(Number(value))) return ErrorMessage.loginNotOnlyNumbers;
  if (!value.match(loginRegExp)) return ErrorMessage.loginNotValid;

  return '';
};

const emailValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  if (!value.match(emailRegExp)) return ErrorMessage.emailNotValid;

  return '';
};

const passwordValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  if (value.length < 8) return ErrorMessage.passwordToSmall;
  if (value.length > 40) return ErrorMessage.passwordToBig;
  if (!value.match(passwordNumberRegExp)) return ErrorMessage.passwordToHaveNumber;
  if (!value.match(passwordUpperCaseRegExp)) return ErrorMessage.passwordUpperCase;

  return '';
};

const phoneValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  if (!value.match(phoneRegExp)) return ErrorMessage.phoneNotValid;

  return '';
};

const requiredValidator = (value: string): string => {
  if (!value) return ErrorMessage.noValue;

  return '';
};

export const valueValidators: {
  [key: string]: (value: string) => string;
} = {
  [VALUE_VALIDATOR_TYPES.name]: nameValidator,
  [VALUE_VALIDATOR_TYPES.login]: loginValidator,
  [VALUE_VALIDATOR_TYPES.email]: emailValidator,
  [VALUE_VALIDATOR_TYPES.password]: passwordValidator,
  [VALUE_VALIDATOR_TYPES.phone]: phoneValidator,
  [VALUE_VALIDATOR_TYPES.required]: requiredValidator,
};

export const validateValue = (
  value: string,
  valueType: Values<typeof VALUE_VALIDATOR_TYPES>,
): string => valueValidators[valueType](value);
