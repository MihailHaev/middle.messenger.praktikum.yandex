import { Block } from './Block';

describe('modules/Block', () => {
  test('should render template', () => {
    const testProps = {
      text: 'test',
    };

    class TestBlock extends Block {
      render() {
        return `<div>${this.props.text}</div>`;
      }
    }

    const testBlock = new TestBlock(testProps);
    expect(testBlock.render()).toEqual(`<div>${testProps.text}</div>`);
  });
});
