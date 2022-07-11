import {
  userAPI,
  ChangedUserProfileRequestData,
  ChangedUserPasswordRequestData,
  apiHasError,
} from '../api';
import type { Dispatch } from '../modules';
import type { PlainObject } from '../utils';

export const changeProfile = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: ChangedUserProfileRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changeUserProfile(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, profileFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, user: response });
};

export const changeAvatar = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: FormData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changeUserAvatar(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, avatarFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false, user: response });
};

export const changePassword = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: ChangedUserPasswordRequestData,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.changeUserPassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, changePasswordFormError: response.reason });
    return;
  }

  dispatch({ isLoading: false });
};

export const getUser = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: number,
) => {
  dispatch({ isLoading: true });
  try {
    const response = await userAPI.getUser(action);

    // eslint-disable-next-line no-console
    console.log('response: ', response);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err: ', err);
  }

  dispatch({ isLoading: false });
};

export const searchUsers = async (
  dispatch: Dispatch<PlainObject>,
  _state: AppState,
  action: string,
) => {
  dispatch({ isLoading: true });
  try {
    const response = await userAPI.searchUsers({
      login: action,
    });

    if (apiHasError(response)) {
      dispatch({ isLoading: false, searchUsersFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, searchedUsers: response });
  } catch (err) {
    dispatch({ isLoading: false });
  }
};

