import authTemplate from './auth.hbs';
import { Input, INPUT_TYPES, Button } from '../../components';

import './auth.css';

export const auth = () => {
    const loginInput = Input({ label: 'Логин' });
    const passwordInput = Input({ label: 'Пароль', type: INPUT_TYPES.password });
    const enterButton = Button({ text: 'Войти' });

    return authTemplate({
        loginInput,
        passwordInput,
        enterButton,
    });
};
