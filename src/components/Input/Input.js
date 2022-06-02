import InputTemplate from './Input.hbs';
import { INPUT_TYPES } from './consts';

import './Input.css';

export const Input = ({
    classes,
    type = INPUT_TYPES.text,
    label,
}) => {
    return InputTemplate({ classes, type, label });
}
