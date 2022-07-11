import { Block } from '../../modules/Block';
import { ROUTES } from '../../modules/router';
import { LinkProps } from '../../components';

import './onboarding.css';

const links = Object.entries(ROUTES).reduce((accum: Array<LinkProps>, route): Array<LinkProps> => {
  const [text, to] = route;
  const isOnBoardingPage = ROUTES.onboarding === to;

  if (isOnBoardingPage) return accum;

  return [
    ...accum,
    {
      text,
      to,
    },
  ];
}, []);

export class OnboardingPage extends Block {
  constructor() {
    super({ links });
  }

  render() {
    return `
      <div class="onboarding">
        {{{Title text="Onboarding" className="onboarding-title"}}}
        <div class="links-wrapper">
        {{#each links}}
          {{#with this}}
            {{{Link text="{{text}}" to="{{to}}" className="onboarding-link"}}}
          {{/with}}
        {{/each}}
        </div>
      <div>
    `;
  }
}
