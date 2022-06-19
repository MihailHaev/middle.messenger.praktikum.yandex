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
function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
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

  _request = (url: string, options: Options = {}, timeout = 5000) => {
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
