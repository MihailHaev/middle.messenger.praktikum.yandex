import { merge, isEqual, cloneDeep } from '@/utils';
import { EventBus } from './EventBus';

export type Dispatch<State> = (
  // eslint-disable-next-line no-use-before-define
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: unknown,
) => void;

export type Action<State> = (dispatch: Dispatch<State>, state: State, payload: unknown) => void;

export class Store<State extends PlainObject> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: State) {
    if (isEqual(this.state, nextState)) {
      return;
    }

    const prevState = cloneDeep(this.state);

    this.state = nextState;

    this.emit('changed', prevState, nextState);
  }

  dispatch<T>(nextStateOrAction: PlainObject | Action<PlainObject>, payload?: T) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set(merge(this.state, nextStateOrAction) as State);
    }
  }
}
