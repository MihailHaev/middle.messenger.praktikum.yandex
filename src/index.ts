import { renderDOM } from './modules/renderDOM';
import { registerComponents } from './modules/registerComponent';
import { route, ROUTES } from './modules/router';
import {
  OnboardingPage,
  AuthPage,
  RegisterPage,
  SettingsPage,
  NotFoundPage,
  ServerErrorPage,
  ChatsPage,
} from './pages';
import * as Сomponents from './components';

import './app.css';

registerComponents(Сomponents);

document.addEventListener('DOMContentLoaded', () => {
  const CurrentPage = route({
    [ROUTES.onboarding]: OnboardingPage,
    [ROUTES.auth]: AuthPage,
    [ROUTES.register]: RegisterPage,
    [ROUTES.chats]: ChatsPage,
    [ROUTES.settings]: SettingsPage,
    [ROUTES.notFound]: NotFoundPage,
    [ROUTES.serverError]: ServerErrorPage,
  });

  const App = new CurrentPage({});

  renderDOM(App, '#app');
});
