import registerTemplate from './register.hbs';
import { Input, INPUT_TYPES, Button } from '../../components';

import './register.css';

export const register = () => {
    const firstNameInput = Input({ label: 'Имя' });   
    const secondNameInput = Input({ label: 'Фамилия' });   
    const loginInput = Input({ label: 'Логин' });   
    const emailInput = Input({ label: 'Почта' });   
    const phoneInput = Input({ label: 'Телефон' });   
    const passwordInput = Input({ label: 'Пароль', type: INPUT_TYPES.password });
    const passwordRepeatInput = Input({ label: 'Повторите пароль', type: INPUT_TYPES.password });
    const enterButton = Button({ text: 'Войти' });

    return registerTemplate({
        firstNameInput,
        secondNameInput,
        loginInput,
        emailInput,
        phoneInput,
        passwordInput,
        passwordRepeatInput,
        enterButton,
    });
};
