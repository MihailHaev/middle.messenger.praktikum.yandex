import { EventBus } from './EventBus';
import { merge, isEqual, cloneDeep, PlainObject } from '../utils';

export type Dispatch<PlainObject> = (
  // eslint-disable-next-line no-use-before-define
  nextStateOrAction: PlainObject | Action<PlainObject>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any,
) => void;

export type Action<PlainObject> = (
  dispatch: Dispatch<PlainObject>,
  state: PlainObject,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
) => void;

export class Store extends EventBus {
  private state: PlainObject = {} as PlainObject;

  constructor(defaultState: AppState) {
    super();

    this.state = defaultState as AppState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: AppState) {
    if (isEqual(this.state, nextState)) {
      return;
    }

    const prevState = cloneDeep(this.state) as AppState;

    this.state = merge(prevState, nextState) as AppState;

    this.emit('changed', prevState, nextState);
  }

  dispatch<T>(nextStateOrAction: PlainObject | Action<PlainObject>, payload?: T) {
    if (typeof nextStateOrAction === 'function') {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set(merge(this.state, nextStateOrAction) as AppState);
    }
  }
}

