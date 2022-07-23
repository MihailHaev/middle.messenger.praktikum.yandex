import { Block } from '@/modules/Block';
import { getInputsData, connect } from '@/utils';
import { login } from '@/services';
import { LoginRequestData } from '@/api';
import { routes } from '@/router';
import { inputs } from './loginInputs';

import './login.css';

type LoginProps = {
  isLoading: boolean;
};

export class LoginPageDefault extends Block<LoginProps> {
  static componentName = 'Login Page';

  constructor(props: LoginProps) {
    super(props);

    this.setState({
      inputs,
      handleClick: this.handleClick,
    });
  }

  handleClick = () => {
    const loginData = getInputsData(inputs) as LoginRequestData | null;

    if (!loginData) {
      return;
    }

    window.store.dispatch(login, loginData);
  };

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

export const LoginPage = connect<LoginProps>(LoginPageDefault, mapStateToProps);
