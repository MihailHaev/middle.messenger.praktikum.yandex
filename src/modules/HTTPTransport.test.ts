import { HTTPTransport } from './HTTPTransport';

describe('modules/HTTPTransport', () => {
  const httpTransport = new HTTPTransport(String(process.env.API_ENDPOINT));

  it('should handler POST request', async () => {
    const response = await httpTransport.post(`/test`);
    expect(response).toEqual('');
  });

  it('should handler GET request', async () => {
    const response = await httpTransport.get(`/test`);
    expect(response).toEqual('');
  });
  it('should handler PUT request', async () => {
    const response = await httpTransport.put(`/test`);
    expect(response).toEqual('');
  });
  it('should handler DELETE request', async () => {
    const response = await httpTransport.delete(`/test`);
    expect(response).toEqual('');
  });
});
