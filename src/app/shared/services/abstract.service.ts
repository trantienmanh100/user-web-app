import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {BOOLEAN_STRING} from "../constants/common.constant";
import {HTTP_HEADERS} from "../constants/http.constants";
import {IBaseResponse} from "../models/base.model";
import CommonUtil from "../utils/common-utils";

export type EntityResponseType<T> = HttpResponse<IBaseResponse<T>>;

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractService {
  private BASE_API_URL = environment.local;

  protected readonly httpOptions: {
    observe: string;
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
  } = {
    observe: 'response',
    // tslint:disable-next-line:no-object-literal-type-assertion
    headers: {} as HttpHeaders,
    // tslint:disable-next-line:no-object-literal-type-assertion
    params: {} as HttpParams,
  };

  protected readonly httpOptionsFile: {
    responseType: string;
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        };
    observe: string;
  } = {
    responseType: 'blob',
    observe: 'response',
    // tslint:disable-next-line:no-object-literal-type-assertion
    headers: {} as HttpHeaders,
    // tslint:disable-next-line:no-object-literal-type-assertion
    params: {} as HttpParams,
  };

  protected constructor(protected http: HttpClient) {}

  /**
   * GET request
   *
   * @author manh
   * @date 2021-12-12
   * @template T template
   * @param url end point of the api
   * @param [options] options of the request like headers, body, etc.
   * @returns Observable<EntityResponseType<T> | any>
   */
  public get<T>(
    url: string,
    options?: any
  ): Observable<EntityResponseType<T> | any> {
    return this.http.get<IBaseResponse<T>>(
      `${this.BASE_API_URL}${url}`,
      this.httpOptionCustomize(options)
    );
  }

  /**
   * GET file request
   *
   * @author manh
   * @date 2021-12-12
   * @template T template
   * @param url end point of the api
   * @param [options] options of the request like headers, body, etc.
   * @returns Observable<Blob | any>
   */
  public getFile(url: string, options?: any): Observable<Blob | any> {
    return this.http.get(
      `${this.BASE_API_URL}${url}`,
      this.httpOptionCustomize(options, true)
    );
  }

  /**
   * POST request
   *
   * @author manh
   * @date 2021-12-12
   * @template T template
   * @param url end point of the api
   * @param body body of the request.
   * @param options options of the request like headers, body, etc.
   * @returns Observable<EntityResponseType<T> | any>
   */
  public post<T>(
    url: string,
    body?: any,
    options?: any
  ): Observable<EntityResponseType<T> | any> {
    return this.http.post<IBaseResponse<T>>(
      `${this.BASE_API_URL}${url}`,
      CommonUtil.optimalObjectParams(body),
      this.httpOptionCustomize(options)
    );
  }

  /**
   * POST file request
   *
   * @author manh
   * @date 2021-12-12
   * @param url end point of the api
   * @param body body of the request.
   * @param options options of the request like headers, body, etc.
   * @returns Observable<Blob | any>
   */
  public postFile(
    url: string,
    body: any,
    options?: any
  ): Observable<Blob | any> {
    return this.http.post(
      `${this.BASE_API_URL}${url}`,
      CommonUtil.optimalObjectParams(body),
      this.httpOptionCustomize(options, true)
    );
  }

  /**
   * PUT request
   *
   * @author manh
   * @date 2021-12-12
   * @template T template
   * @param url end point of the api
   * @param body body of the request.
   * @param options options of the request like headers, body, etc.
   * @returns Observable<EntityResponseType<T> | any>
   */
  public put<T>(
    url: string,
    body: any,
    options?: any
  ): Observable<EntityResponseType<T> | any> {
    return this.http.put<IBaseResponse<T>>(
      `${this.BASE_API_URL}${url}`,
      CommonUtil.optimalObjectParams(body),
      this.httpOptionCustomize(options)
    );
  }

  /**
   * DELETE request
   *
   * @author manh
   * @date 2021-12-12
   * @template T template
   * @param url end point of the api
   * @param options options of the request like headers, body, etc.
   * @returns Observable<EntityResponseType<T> | any>
   */
  public delete<T>(
    url: string,
    options?: any
  ): Observable<EntityResponseType<T> | any> {
    return this.http.delete<IBaseResponse<T>>(
      `${this.BASE_API_URL}${url}`,
      this.httpOptionCustomize(options)
    );
  }

  /**
   * httpOptionCustomize
   *
   * @author manh
   * @date 2021-12-12
   * @param options httpOptions
   * @note với các service cần set headers trong httpOptions thì tạo object json dạng {}, không dùng new HttpHeaders để tạo,
   * ví dụ tạo: headers: { xxx: xxx }
   * @returns any
   */
  private httpOptionCustomize(options?: any, httpFile = false): any {
    const httpOptions = httpFile
      ? { ...this.httpOptionsFile }
      : { ...this.httpOptions };
    if (options?.observe) {
      httpOptions.observe = options.observe;
    }

    if (options?.loading !== false) {
      if (options?.ignoreError === true) {
        httpOptions.headers = new HttpHeaders({
          ...httpOptions.headers,
          [HTTP_HEADERS.X_IGNORE_ERROR]: BOOLEAN_STRING.TRUE,
          [HTTP_HEADERS.X_LOADING]: BOOLEAN_STRING.TRUE,
        });
      } else {
        httpOptions.headers = new HttpHeaders({
          ...options?.headers,
          [HTTP_HEADERS.X_LOADING]: BOOLEAN_STRING.TRUE,
        });
      }
    } else {
      if (options?.ignoreError === true) {
        httpOptions.headers = new HttpHeaders({
          ...httpOptions.headers,
          [HTTP_HEADERS.X_IGNORE_ERROR]: BOOLEAN_STRING.TRUE,
        });
      }
    }
    if (options?.params) {
      httpOptions.params = CommonUtil.optimalObjectParams(options?.params);
    }
    return httpOptions;
  }
}
