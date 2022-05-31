import ButtonTemplate from './Button.hbs';

import './Button.css';

export const Button = ({
    classnames,
    text,
}) =>
    ButtonTemplate({ classnames, text });
