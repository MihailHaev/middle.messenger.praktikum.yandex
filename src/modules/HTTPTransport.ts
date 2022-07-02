import { isObject } from '../utils';

interface Headers {
  [key: string]: string;
}

export const enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

type Options = {
  headers?: Headers;
  timeout?: number;
  method?: Methods;
  data?: Document | XMLHttpRequestBodyInit | null | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryStringify(data: unknown): string | never {
  if (!isObject(data)) {
    throw new Error('Data must be object');
  }

  const queryStringifyObj = (mainKey: string, objOfData: object): string => {
    const resultArray = Object.entries(objOfData).map(([key, value]) => {
      if (isObject(value) || Array.isArray(value)) {
        return queryStringifyObj(`${mainKey}[${key}]`, value);
      }
      return `${mainKey}[${key}]=${value}`;
    });

    return resultArray.join('&');
  };

  const entries = Object.entries(data);
  return entries.reduce((result, [key, value], index) => {
    let resultString = `${key}=${value}`;

    if (isObject(value) || Array.isArray(value)) {
      // eslint-disable-next-line no-param-reassign
      resultString = queryStringifyObj(key, value);
    }

    return `${result}${!index ? '' : '&'}${resultString}`;
  }, '?');
}

export class HTTPTransport {
  get = (url: string, options: Options = {}) => {
    return this._request(url, { ...options, method: Methods.get }, options.timeout);
  };

  post = (url: string, options: Options = {}) => {
    return this._request(url, { ...options, method: Methods.post }, options.timeout);
  };

  put = (url: string, options: Options = {}) => {
    return this._request(url, { ...options, method: Methods.put }, options.timeout);
  };

  delete = (url: string, options: Options = {}) => {
    return this._request(url, { ...options, method: Methods.delete }, options.timeout);
  };

  private _request = (url: string, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.get;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
