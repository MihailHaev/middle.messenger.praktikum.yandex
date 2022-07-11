import { PlainObject } from './isObject';
import { BlockClass } from '../modules';
import { cloneDeep } from './cloneDeep';
import { isEqual } from './isEqual';

export function connect(Component: BlockClass, mapStateToProps: (state: AppState) => PlainObject) {
  return class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
      super({ ...props, ...mapStateToProps(window.store.getState()) });

      window.store.on('changed', this.mapStateToProps);
    }

    mapStateToProps = (prevState: AppState, nextState: AppState) => {
      const nextProps = cloneDeep(mapStateToProps(nextState));
      const prevProps = cloneDeep(mapStateToProps(prevState));

      if (isEqual(nextProps, prevProps)) {
        return;
      }
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps({ ...mapStateToProps(window.store.getState()) });
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

