import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { server } from './apiMock';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('nanoid', () => {
  return {
    nanoid: (num: number) => `${new Date().getTime()}${num}`,
  };
});
