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

import { SessionDto } from '../models/session-dto';
import { SubscriptionInfo } from '../models/subscription-info';
import { SubscriptionPlan } from '../models/subscription-plan';
import { SubscriptionSession } from '../models/subscription-session';

@Injectable({
  providedIn: 'root',
})
export class StripeSubscriptionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation apiStripeSubscriptionSessionPost
   */
  static readonly ApiStripeSubscriptionSessionPostPath =
    '/api/StripeSubscription/session';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionSessionPost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiStripeSubscriptionSessionPost$Plain$Response(params?: {
    body?: SubscriptionSession;
  }): Observable<StrictHttpResponse<SessionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionSessionPostPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/plain',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<SessionDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionSessionPost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiStripeSubscriptionSessionPost$Plain(params?: {
    body?: SubscriptionSession;
  }): Observable<SessionDto> {
    return this.apiStripeSubscriptionSessionPost$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SessionDto>) => r.body as SessionDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionSessionPost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiStripeSubscriptionSessionPost$Json$Response(params?: {
    body?: SubscriptionSession;
  }): Observable<StrictHttpResponse<SessionDto>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionSessionPostPath,
      'post'
    );
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'text/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<SessionDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionSessionPost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiStripeSubscriptionSessionPost$Json(params?: {
    body?: SubscriptionSession;
  }): Observable<SessionDto> {
    return this.apiStripeSubscriptionSessionPost$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SessionDto>) => r.body as SessionDto)
    );
  }

  /**
   * Path part for operation apiStripeSubscriptionAfterPurchasePost
   */
  static readonly ApiStripeSubscriptionAfterPurchasePostPath =
    '/api/StripeSubscription/after-purchase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionAfterPurchasePost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionAfterPurchasePost$Plain$Response(params?: {
    sessionId?: string;
  }): Observable<StrictHttpResponse<SubscriptionInfo>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionAfterPurchasePostPath,
      'post'
    );
    if (params) {
      rb.query('sessionId', params.sessionId, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/plain',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<SubscriptionInfo>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionAfterPurchasePost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionAfterPurchasePost$Plain(params?: {
    sessionId?: string;
  }): Observable<SubscriptionInfo> {
    return this.apiStripeSubscriptionAfterPurchasePost$Plain$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<SubscriptionInfo>) => r.body as SubscriptionInfo
      )
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionAfterPurchasePost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionAfterPurchasePost$Json$Response(params?: {
    sessionId?: string;
  }): Observable<StrictHttpResponse<SubscriptionInfo>> {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionAfterPurchasePostPath,
      'post'
    );
    if (params) {
      rb.query('email', params.sessionId, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'text/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<SubscriptionInfo>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionAfterPurchasePost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionAfterPurchasePost$Json(params?: {
    sessionId?: string;
  }): Observable<SubscriptionInfo> {
    return this.apiStripeSubscriptionAfterPurchasePost$Json$Response(
      params
    ).pipe(
      map(
        (r: StrictHttpResponse<SubscriptionInfo>) => r.body as SubscriptionInfo
      )
    );
  }

  /**
   * Path part for operation apiStripeSubscriptionPlansGet
   */
  static readonly ApiStripeSubscriptionPlansGetPath =
    '/api/StripeSubscription/plans';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionPlansGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionPlansGet$Plain$Response(params?: {}): Observable<
    StrictHttpResponse<Array<SubscriptionPlan>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionPlansGetPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/plain',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<SubscriptionPlan>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionPlansGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionPlansGet$Plain(params?: {}): Observable<
    Array<SubscriptionPlan>
  > {
    return this.apiStripeSubscriptionPlansGet$Plain$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<SubscriptionPlan>>) =>
          r.body as Array<SubscriptionPlan>
      )
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStripeSubscriptionPlansGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionPlansGet$Json$Response(params?: {}): Observable<
    StrictHttpResponse<Array<SubscriptionPlan>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      StripeSubscriptionService.ApiStripeSubscriptionPlansGetPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'text/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<SubscriptionPlan>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStripeSubscriptionPlansGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiStripeSubscriptionPlansGet$Json(params?: {}): Observable<
    Array<SubscriptionPlan>
  > {
    return this.apiStripeSubscriptionPlansGet$Json$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<SubscriptionPlan>>) =>
          r.body as Array<SubscriptionPlan>
      )
    );
  }
}
