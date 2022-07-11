import { InputTypes } from '../components';
import { validateValue, VALUE_VALIDATOR_TYPES } from './validators';

type PageData = {
  [key: string]: string;
};

export type InputCreateData = {
  id: string;
  value?: string | number;
  placeholder?: string;
  validationRule?: Values<typeof VALUE_VALIDATOR_TYPES>;
  type?: InputTypes;
};

export const getInputsData = (inputsData: InputCreateData[]): PageData | null => {
  return inputsData.reduce((accum: PageData | null, { id, validationRule }) => {
    const input = document.querySelector(`input#${id}`) as HTMLInputElement | null;

    if (!input) {
      return null;
    }

    if (validationRule && validateValue(input.value, validationRule)) {
      input.focus();
      input.blur();
      return null;
    }

    if (accum) {
      return { ...accum, [id]: input.value };
    }
    return accum;
  }, {});
};

