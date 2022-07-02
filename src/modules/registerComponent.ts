import Handlebars, { HelperOptions } from 'handlebars';
import { Block } from './Block';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BlockConstructable<Props = any> {
  new (props: Props): Block;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerComponent<Props = any>(Component: BlockConstructable<Props>) {
  Handlebars.registerHelper(
    Component.name,
    // eslint-disable-next-line func-names
    function (this: Props, { hash: { ref, ...hash }, data, fn }: HelperOptions) {
      const { children = {}, refs = {} } = data.root;

      /**
       * Костыль для того, чтобы передавать переменные
       * внутрь блоков вручную подменяя значение
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (`{{${key}}}` === hash[key]) {
          // eslint-disable-next-line no-param-reassign
          hash[key] = this[key];
        }
      });

      console.log('hash: ', hash);
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

export const registerComponents = (Сomponents: { [key: string]: unknown }) => {
  Object.keys(Сomponents).forEach((componentKey) => {
    // eslint-disable-next-line import/namespace
    const Сomponent = Сomponents[componentKey];

    if (Object.getPrototypeOf(Сomponent) === Block) {
      registerComponent(Сomponent as BlockConstructable);
    }
  });
};
