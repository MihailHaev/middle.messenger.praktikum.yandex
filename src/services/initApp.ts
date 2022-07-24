import { authAPI, apiHasError } from '@/api';
import { consoleLog } from '@/utils';
import type { Dispatch } from '@/modules';

export async function initApp(dispatch: Dispatch<PlainObject>) {
  try {
    const response = await authAPI.me();
    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: response });
  } catch (err) {
    consoleLog(err);
  } finally {
    dispatch({ isLoading: false, isAuthChecked: true });
  }
}
