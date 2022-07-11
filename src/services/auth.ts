import { authAPI, apiHasError, LoginRequestData, RegisterRequestData } from '../api';
import type { Dispatch } from '../modules';
import { routes } from '../routerr';
import type { PlainObject } from '../utils';

export const logout = async (dispatch: Dispatch<PlainObject>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go(routes.login.path);
};

export const login = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: LoginRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, authFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, authFormError: null });

  if (apiHasError(responseUser)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: responseUser });

  window.router.go(routes.chats.path);
};

export const register = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: RegisterRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.register(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, registerFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, registerFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ user: responseUser as User });

  window.router.go(routes.chats.path);
};
