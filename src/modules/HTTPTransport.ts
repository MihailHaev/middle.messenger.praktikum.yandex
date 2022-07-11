import { isArrayOrObject, isObject } from '../utils';

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
  credentials?: string;
  mode?: string;
  data?: Record<string, unknown> | XMLHttpRequestBodyInit;
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
  APIEndpoint: string;

  constructor(endpoint: string) {
    this.APIEndpoint = endpoint;
  }

  get = <T>(path: string, options: Options = {}) => {
    const { data, ...otherOptions } = options;

    return this._request<T>(
      `${this.APIEndpoint}${path}${data ? queryStringify(data) : ''}`,
      {
        ...otherOptions,
        method: Methods.get,
      },
      options.timeout,
    );
  };

  post = <T>(path: string, options: Options = {}) => {
    return this._request<T>(
      `${this.APIEndpoint}${path}`,
      {
        ...options,
        method: Methods.post,
      },
      options.timeout,
    );
  };

  put = <T>(path: string, options: Options = {}) => {
    return this._request<T>(
      `${this.APIEndpoint}${path}`,
      {
        ...options,
        method: Methods.put,
      },
      options.timeout,
    );
  };

  delete = <T>(path: string, options: Options = {}) => {
    return this._request<T>(
      `${this.APIEndpoint}${path}`,
      {
        ...options,
        method: Methods.delete,
      },
      options.timeout,
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-explicit-any
  private _request = <T extends any>(
    url: string,
    options: Options = {},
    timeout = 5000,
  ): Promise<T> => {
    const { headers, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      if (isObject(headers)) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      } else if (isArrayOrObject(data)) {
        xhr.setRequestHeader('content-type', 'application/json');
      }

      xhr.onload = () => {
        try {
          resolve(JSON.parse(xhr.response));
        } catch (_err) {
          resolve(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (!data) {
        xhr.send();
      } else if (isArrayOrObject(data)) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
