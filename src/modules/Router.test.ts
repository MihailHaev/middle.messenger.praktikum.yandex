/* eslint-disable max-classes-per-file */
import { routes } from '@/router';

import { Router } from './Router';

describe('modules/Router', () => {
  it('should update history after route to new page', () => {
    const router = new Router();

    router.go(routes.login.path);
    expect(window.history.length).toBe(2);
  });

  it('should emit callback after go', () => {
    const router = new Router();
    const mock = jest.fn();
    router.use(routes.login.path, mock).use(routes.register.path, mock);

    router.go(routes.login.path);
    router.go(routes.register.path);

    expect(mock).toHaveBeenCalledTimes(2);
  });
});
