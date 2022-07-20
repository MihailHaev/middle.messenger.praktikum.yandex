import { Block } from '@/modules/Block';
import { getInputsData, connect } from '@/utils';
import { login } from '@/services';
import { LoginRequestData } from '@/api';
import { routes } from '@/router';
import { inputs } from './loginInputs';

import './login.css';

export class LoginPageDefault extends Block {
  static componentName = 'Login Page';

  constructor() {
    const handleClick = () => {
      const loginData = getInputsData(inputs) as LoginRequestData | null;

      if (!loginData) {
        return;
      }

      window.store.dispatch(login, loginData);
    };

    super({ inputs, handleClick });
  }

  render() {
    return `
      <div class="login">
        {{#if isLoading}}{{{Loading  isLoading=isLoading }}}{{/if}}
        {{{Title text="Авторизация" className="login-title"}}}
        {{#each inputs}}
          {{#with this}}
            {{{Field placeholder="{{placeholder}}" type="{{type}}" className="login-input" validationRule="{{validationRule}}" id="{{id}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Войти" className="login-button" onClick=handleClick}}}
        {{{Link text="Нет аккаунта?" to="${routes.register.path}"}}}
      </div>
    `;
  }
}
const mapStateToProps = (state: AppState) => ({
  isLoading: state.isLoading,
});

export const LoginPage = connect(LoginPageDefault, mapStateToProps);
