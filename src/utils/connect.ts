import { PlainObject } from './isObject';
import { BlockClass } from '../modules';
import { cloneDeep } from './cloneDeep';
import { isEqual } from './isEqual';

export function connect(Component: BlockClass, mapStateToProps: (state: AppState) => PlainObject) {
  let prevProps = {};
  return class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
      prevProps = cloneDeep(mapStateToProps(window.store.getState()));

      super({ ...props, ...prevProps });

      window.store.on('changed', this.mapStateToProps);
    }

    mapStateToProps = (_prevState: AppState, nextState: AppState) => {
      const nextProps = cloneDeep(mapStateToProps(nextState));

      if (isEqual(nextProps, prevProps)) {
        return;
      }
      prevProps = nextProps;
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(nextProps);
    };

    componentDidUnmount(): void {
      window.store.off('changed', this.mapStateToProps);
    }
  };
}

export const withUser = (Component: BlockClass) =>
  connect(Component, (state) => ({ user: state.user }));

export const withLoading = (Component: BlockClass) =>
  connect(Component, (state: AppState) => ({ isLoading: state.isLoading }));
