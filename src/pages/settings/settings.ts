import { Block } from '../../modules';
import { getInputsData, InputCreateData } from '../../utils';
import { ChangeProfileRequestData, ChangePasswordRequestData } from '../../api';
import { profileInputs, avatarInput, passwordInputs } from './settingsInputs';
import { changeProfile, changeAvatar, changePassword } from '../../services';
import { routes } from '../../routerr';

import './settings.css';

const inputs = [...profileInputs, avatarInput, ...passwordInputs];

export class SettingsPage extends Block {
  static componentName = 'Settings Page';

  constructor() {
    const { user } = window.store.getState();

    Object.entries(user as User).forEach(([key, value]) => {
      const input = inputs.find(({ id }) => id === key);
      if (!input || !value) return;
      input as InputCreateData;
      input.value = value;
    });

    const handleChangeProfile = () => {
      const profileData = getInputsData(profileInputs) as ChangeProfileRequestData | null;

      if (!profileData) {
        return;
      }

      window.store.dispatch(changeProfile, profileData);
    };

    const handleChangeAvatar = () => {
      const avatar = document.getElementById('avatar') as HTMLInputElement;

      if (!avatar || !avatar.files) return;
      const avatarData = new FormData();

      avatarData.append('avatar', avatar.files[0], 'test.jpg');

      window.store.dispatch(changeAvatar, avatarData);
    };

    const handleChangePassword = () => {
      const passwordData = getInputsData(passwordInputs) as ChangePasswordRequestData | null;

      if (!passwordData) {
        return;
      }

      window.store.dispatch(changePassword, passwordData);
    };

    super({
      profileInputs,
      avatarInputs: [avatarInput],
      passwordInputs,
      userAvatar: `${process.env.IMG_ENDPOINT}${user.avatar}`,
      handleChangeProfile,
      handleChangeAvatar,
      handleChangePassword,
    });
  }

  render() {
    return `
      <div class="page-wrapper">
        {{{Title text="Настройки" className="settings-title"}}}
        <img alt="avatar" src="{{userAvatar}}" />
        {{#each avatarInputs}}
          {{#with this}}
            {{{Field placeholder="{{placeholder}}" type="{{type}}" className="settings-input" validationRule="{{validationRule}}" id="{{id}}" value="{{value}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Сохранить аватар" className="settings-button" onClick=handleChangeAvatar}}}
        {{#each profileInputs}}
          {{#with this}}
            {{{Field placeholder="{{placeholder}}" type="{{type}}" className="settings-input" validationRule="{{validationRule}}" id="{{id}}" value="{{value}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Сохранить профиль" className="settings-button" onClick=handleChangeProfile}}}
        {{#each passwordInputs}}
          {{#with this}}
            {{{Field placeholder="{{placeholder}}" type="{{type}}" className="settings-input" validationRule="{{validationRule}}" id="{{id}}" value="{{value}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Сохранить пароль" className="settings-button" onClick=handleChangePassword}}}
        {{{Link text="Чаты" to="${routes.chats.path}"}}}
      </div>
    `;
  }
}
