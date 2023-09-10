import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];

export const server = setupServer(...handlers);
