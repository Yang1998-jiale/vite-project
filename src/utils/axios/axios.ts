
import axios, { AxiosInstance, AxiosResponse } from "axios";

function isFunction(target) {
  return typeof target === "function";
}

export default class Axios {
  private axiosInstance: AxiosInstance;
  private readonly options: any;

  constructor(options) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.axiosInterceptor();
  }

  getAxios() {
    return this.axiosInstance;
  }

  // private createAxios(options) {
  //   this.axiosInstance = axios.create(options);
  // }

  //设置拦截器
  private axiosInterceptor() {
    const {
      axiosInstance,
      options: { transform },
    } = this;
    if (!transform) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform as any;

    //设置请求拦截
    this.axiosInstance.interceptors.request.use((config: any) => {
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }
      return config;
    }, undefined);
    //设置请求拦截错误处理
    if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
      this.axiosInstance.interceptors.request.use(requestInterceptorsCatch);
    }

    //
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res, this.options);
      }
      return res;
    }, undefined);
    //设置响应拦截处理
    if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
      this.axiosInstance.interceptors.response.use(undefined, (error) => {
        return responseInterceptorsCatch(axiosInstance, error);
      });
    }
  }
  get<T>(config, options) {
    return this.request<T>({ ...config, method: "get" }, options);
  }
  post<T>(config, options) {
    return this.request<T>({ ...config, method: "post" }, options);
  }

  getTransform() {
    const { transform } = this.options;
    return transform;
  }
  request<T = any>(config, options): Promise<T> {
    const { requestOptions } = this.options;
    const opt = Object.assign({}, requestOptions, options);
    config.requestOptions = opt;
    const transform = this.getTransform();
    const { transformResponse, beforeRequestHook } = transform;
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(config, opt);
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res: AxiosResponse<any>) => {
          if (transformResponse && isFunction(transformResponse)) {
            try {
              const newRes = transformResponse(res, opt);
              resolve(newRes);
            } catch (error) {
              reject(error || new Error("request error!"));
            }
            return;
          }

          resolve(res as unknown as T);
        })
        .catch((err) => {
          //等待处理
          reject(err);
        });
    });
  }
}
