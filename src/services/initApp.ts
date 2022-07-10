import { authAPI, apiHasError } from '../api';
import { Dispatch } from '../modules';

export async function initApp(dispatch: Dispatch<AppState>) {
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
