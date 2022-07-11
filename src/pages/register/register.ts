import { Block } from '../../modules';
import { getInputsData } from '../../utils';
import { register } from '../../services';
import { routes } from '../../routerr';
import { RegisterRequestData } from '../../api';
import { inputs } from './registerInputs';

import './register.css';

export class RegisterPage extends Block {
  static componentName = 'Register Page';

  constructor() {
    const handleClick = () => {
      const registerData = getInputsData(inputs) as RegisterRequestData | null;

      if (!registerData) {
        return;
      }

      window.store.dispatch(register, registerData);
    };

    super({ inputs, handleClick });
  }

  render() {
    return `
      <div class="page-wrapper">
        {{{Title text="Регистрация" className="register-title"}}}
        {{#each inputs}}
          {{#with this}}
            {{{Field placeholder="{{placeholder}}" type="{{type}}" className="register-input" validationRule="{{validationRule}}" id="{{id}}"}}}
          {{/with}}
        {{/each}}
        {{{Button text="Войти" className="register-button" onClick=handleClick}}}
        {{{Link text="Есть аккаунт?" to="${routes.login.path}"}}}
      </div>
    `;
  }
}
