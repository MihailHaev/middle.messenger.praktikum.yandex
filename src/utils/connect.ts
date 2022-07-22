import { BlockClass } from '@/modules';
import { cloneDeep } from './cloneDeep';
import { isEqual } from './isEqual';

export function connect<T extends PlainObject>(
  Component: BlockClass<T>,
  mapStateToProps: (state: AppState) => T,
) {
  let prevProps = {};
  return class extends Component {
    constructor(props: T) {
      prevProps = cloneDeep(mapStateToProps(window.store.getState()) as PlainObject);

      super({ ...props, ...prevProps });

      window.store.on('changed', this.mapStateToProps);
    }

    mapStateToProps = (_prevState: AppState, nextState: AppState) => {
      const nextProps = cloneDeep(mapStateToProps(nextState) as PlainObject);

      if (isEqual(nextProps, prevProps)) {
        return;
      }
      prevProps = nextProps;
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(nextProps as T);
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
