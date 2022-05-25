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

import { ArtistToReturnDto } from '../models/artist-to-return-dto';
import { ArtistToUpdateDto } from '../models/artist-to-update-dto';

@Injectable({
  providedIn: 'root',
})
export class ArtistService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiArtistGet
   */
  static readonly ApiArtistGetPath = '/api/Artist';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistGet$Plain$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<ArtistToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistGetPath, 'get');
    if (params) {
      rb.query('PageIndex', params.PageIndex, {});
      rb.query('PageSize', params.PageSize, {});
      rb.query('Category', params.Category, {});
      rb.query('Genre', params.Genre, {});
      rb.query('Sort', params.Sort, {});
      rb.query('Search', params.Search, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArtistToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistGet$Plain(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<ArtistToReturnDto>> {

    return this.apiArtistGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArtistToReturnDto>>) => r.body as Array<ArtistToReturnDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistGet$Json$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<ArtistToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistGetPath, 'get');
    if (params) {
      rb.query('PageIndex', params.PageIndex, {});
      rb.query('PageSize', params.PageSize, {});
      rb.query('Category', params.Category, {});
      rb.query('Genre', params.Genre, {});
      rb.query('Sort', params.Sort, {});
      rb.query('Search', params.Search, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArtistToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistGet$Json(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<ArtistToReturnDto>> {

    return this.apiArtistGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArtistToReturnDto>>) => r.body as Array<ArtistToReturnDto>)
    );
  }

  /**
   * Path part for operation apiArtistPost
   */
  static readonly ApiArtistPostPath = '/api/Artist';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiArtistPost$Response(params?: {
    body?: { 'FirstName': string, 'LastName': string, 'SceneName': string, 'Photo': Blob, 'DateOfBirth': string }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiArtistPost(params?: {
    body?: { 'FirstName': string, 'LastName': string, 'SceneName': string, 'Photo': Blob, 'DateOfBirth': string }
  }): Observable<void> {

    return this.apiArtistPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiArtistIdGet
   */
  static readonly ApiArtistIdGetPath = '/api/Artist/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ArtistToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ArtistToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdGet$Plain(params: {
    id: number;
  }): Observable<ArtistToReturnDto> {

    return this.apiArtistIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<ArtistToReturnDto>) => r.body as ArtistToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<ArtistToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ArtistToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdGet$Json(params: {
    id: number;
  }): Observable<ArtistToReturnDto> {

    return this.apiArtistIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<ArtistToReturnDto>) => r.body as ArtistToReturnDto)
    );
  }

  /**
   * Path part for operation apiArtistIdPut
   */
  static readonly ApiArtistIdPutPath = '/api/Artist/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiArtistIdPut$Response(params: {
    id: number;
    body?: ArtistToUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistIdPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiArtistIdPut(params: {
    id: number;
    body?: ArtistToUpdateDto
  }): Observable<void> {

    return this.apiArtistIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiArtistIdDelete
   */
  static readonly ApiArtistIdDeletePath = '/api/Artist/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistIdDeletePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiArtistIdDelete(params: {
    id: number;
  }): Observable<void> {

    return this.apiArtistIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiArtistIdPhotoPut
   */
  static readonly ApiArtistIdPhotoPutPath = '/api/Artist/{id}/photo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiArtistIdPhotoPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiArtistIdPhotoPut$Response(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ArtistService.ApiArtistIdPhotoPutPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiArtistIdPhotoPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiArtistIdPhotoPut(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<void> {

    return this.apiArtistIdPhotoPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
