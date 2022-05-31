import settingsTemplate from './settings.hbs';
import { Input, INPUT_TYPES, Button } from '../../components';

import './settings.css';

export const settings = () => {
    const firstNameInput = Input({ label: 'Имя' });   
    const secondNameInput = Input({ label: 'Фамилия' });   
    const loginInput = Input({ label: 'Логин' });   
    const emailInput = Input({ label: 'Почта' });   
    const phoneInput = Input({ label: 'Телефон' });   
    const avatarInput = Input({ label: 'Аватар' });   
    const oldPasswordInput = Input({ label: 'Старый пароль', type: INPUT_TYPES.password });
    const newPasswordInput = Input({ label: 'Новый пароль', type: INPUT_TYPES.password });
    const saveButton = Button({ text: 'Сохранить' });

    return settingsTemplate({
        firstNameInput,
        secondNameInput,
        loginInput,
        emailInput,
        phoneInput,
        avatarInput,
        oldPasswordInput,
        newPasswordInput,
        saveButton,
    });
};
