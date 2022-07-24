import { authAPI, apiHasError, LoginRequestData, RegisteredRequestData } from '../api';
import type { Dispatch } from '../modules';
import { routes } from '../router';

export const logout = async (dispatch: Dispatch<PlainObject>) => {
  dispatch({ isLoading: true });

  try {
    await authAPI.logout();

    dispatch({ isLoading: false, user: null });

    window.router.go(routes.login.path);
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const login = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: LoginRequestData,
) => {
  dispatch({ isLoading: true });

  try {
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
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

export const register = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: RegisteredRequestData,
) => {
  dispatch({ isLoading: true });

  try {
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
  } catch (err) {
    dispatch({ isLoading: false });
  }
};
