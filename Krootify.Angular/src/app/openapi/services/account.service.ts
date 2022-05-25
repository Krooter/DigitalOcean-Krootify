/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginDto } from '../models/login-dto';
import { RegisterDto } from '../models/register-dto';
import { UserForLoginDto } from '../models/user-for-login-dto';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAccountGet
   */
  static readonly ApiAccountGetPath = '/api/Account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountGet$Plain(params?: {
  }): Observable<UserForLoginDto> {

    return this.apiAccountGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountGet$Json(params?: {
  }): Observable<UserForLoginDto> {

    return this.apiAccountGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

  /**
   * Path part for operation apiAccountEmailexistsGet
   */
  static readonly ApiAccountEmailexistsGetPath = '/api/Account/emailexists';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountEmailexistsGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountEmailexistsGet$Plain$Response(params?: {
    email?: string;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountEmailexistsGetPath, 'get');
    if (params) {
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountEmailexistsGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountEmailexistsGet$Plain(params?: {
    email?: string;
  }): Observable<boolean> {

    return this.apiAccountEmailexistsGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountEmailexistsGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountEmailexistsGet$Json$Response(params?: {
    email?: string;
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountEmailexistsGetPath, 'get');
    if (params) {
      rb.query('email', params.email, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountEmailexistsGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAccountEmailexistsGet$Json(params?: {
    email?: string;
  }): Observable<boolean> {

    return this.apiAccountEmailexistsGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation apiAccountLoginPost
   */
  static readonly ApiAccountLoginPostPath = '/api/Account/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountLoginPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountLoginPost$Plain$Response(params?: {
    body?: LoginDto
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountLoginPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountLoginPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountLoginPost$Plain(params?: {
    body?: LoginDto
  }): Observable<UserForLoginDto> {

    return this.apiAccountLoginPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountLoginPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountLoginPost$Json$Response(params?: {
    body?: LoginDto
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountLoginPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountLoginPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountLoginPost$Json(params?: {
    body?: LoginDto
  }): Observable<UserForLoginDto> {

    return this.apiAccountLoginPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

  /**
   * Path part for operation apiAccountRegisterPost
   */
  static readonly ApiAccountRegisterPostPath = '/api/Account/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountRegisterPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountRegisterPost$Plain$Response(params?: {
    body?: RegisterDto
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountRegisterPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountRegisterPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountRegisterPost$Plain(params?: {
    body?: RegisterDto
  }): Observable<UserForLoginDto> {

    return this.apiAccountRegisterPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAccountRegisterPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountRegisterPost$Json$Response(params?: {
    body?: RegisterDto
  }): Observable<StrictHttpResponse<UserForLoginDto>> {

    const rb = new RequestBuilder(this.rootUrl, AccountService.ApiAccountRegisterPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserForLoginDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAccountRegisterPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAccountRegisterPost$Json(params?: {
    body?: RegisterDto
  }): Observable<UserForLoginDto> {

    return this.apiAccountRegisterPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<UserForLoginDto>) => r.body as UserForLoginDto)
    );
  }

}
