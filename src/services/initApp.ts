import { authAPI, apiHasError } from '../api';
import { Dispatch } from '../modules';
import { PlainObject } from '../utils';

export async function initApp(dispatch: Dispatch<PlainObject>) {
  try {
    const response = await authAPI.me();
    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: response });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    dispatch({ isLoading: false, isAuthChecked: true });
  }
}
