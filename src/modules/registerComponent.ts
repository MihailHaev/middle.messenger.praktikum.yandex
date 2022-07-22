import Handlebars, { HelperOptions } from 'handlebars';
import { Block, BlockClass } from './Block';

function registerComponent<Props extends PlainObject = PlainObject>(Component: BlockClass<Props>) {
  Handlebars.registerHelper(
    Component.componentName as string,
    // eslint-disable-next-line func-names
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      const { children = {}, refs = {} } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (`{{${String(key)}}}` === hash[key]) {
          // eslint-disable-next-line no-param-reassign
          hash[key] = this[key];
        }
      });

      const component = new Component(hash);

      children[component.id] = component;

      if (ref) {
        refs[ref] = component;
      }

      const contents = fn ? fn(this) : '';

      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}

export const registerComponents = (Сomponents: PlainObject) => {
  Object.keys(Сomponents).forEach((componentKey) => {
    const Сomponent = Сomponents[componentKey];

    if (Object.getPrototypeOf(Сomponent) === Block) {
      if (!(Сomponent as BlockClass).componentName) {
        (Сomponent as BlockClass).componentName = componentKey;
      }

      registerComponent(Сomponent as BlockClass);
    }
  });
};
