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

import { AlbumToReturnDto } from '../models/album-to-return-dto';
import { AlbumToUpdateDto } from '../models/album-to-update-dto';

@Injectable({
  providedIn: 'root',
})
export class AlbumService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiAlbumGet
   */
  static readonly ApiAlbumGetPath = '/api/Album';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumGet$Plain$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<AlbumToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumGetPath, 'get');
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
        return r as StrictHttpResponse<Array<AlbumToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAlbumGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumGet$Plain(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<AlbumToReturnDto>> {

    return this.apiAlbumGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AlbumToReturnDto>>) => r.body as Array<AlbumToReturnDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumGet$Json$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<AlbumToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumGetPath, 'get');
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
        return r as StrictHttpResponse<Array<AlbumToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAlbumGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumGet$Json(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<AlbumToReturnDto>> {

    return this.apiAlbumGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AlbumToReturnDto>>) => r.body as Array<AlbumToReturnDto>)
    );
  }

  /**
   * Path part for operation apiAlbumPost
   */
  static readonly ApiAlbumPostPath = '/api/Album';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiAlbumPost$Response(params?: {
    body?: { 'Name': string, 'Photo': Blob, 'Description': string, 'ReleaseDate': string }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiAlbumPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiAlbumPost(params?: {
    body?: { 'Name': string, 'Photo': Blob, 'Description': string, 'ReleaseDate': string }
  }): Observable<void> {

    return this.apiAlbumPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiAlbumIdGet
   */
  static readonly ApiAlbumIdGetPath = '/api/Album/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<AlbumToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlbumToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAlbumIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdGet$Plain(params: {
    id: number;
  }): Observable<AlbumToReturnDto> {

    return this.apiAlbumIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<AlbumToReturnDto>) => r.body as AlbumToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<AlbumToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AlbumToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiAlbumIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdGet$Json(params: {
    id: number;
  }): Observable<AlbumToReturnDto> {

    return this.apiAlbumIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<AlbumToReturnDto>) => r.body as AlbumToReturnDto)
    );
  }

  /**
   * Path part for operation apiAlbumIdPut
   */
  static readonly ApiAlbumIdPutPath = '/api/Album/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAlbumIdPut$Response(params: {
    id: number;
    body?: AlbumToUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiAlbumIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiAlbumIdPut(params: {
    id: number;
    body?: AlbumToUpdateDto
  }): Observable<void> {

    return this.apiAlbumIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiAlbumIdDelete
   */
  static readonly ApiAlbumIdDeletePath = '/api/Album/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiAlbumIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiAlbumIdDelete(params: {
    id: number;
  }): Observable<void> {

    return this.apiAlbumIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiAlbumIdPhotoPut
   */
  static readonly ApiAlbumIdPhotoPutPath = '/api/Album/{id}/photo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiAlbumIdPhotoPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiAlbumIdPhotoPut$Response(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AlbumService.ApiAlbumIdPhotoPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiAlbumIdPhotoPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiAlbumIdPhotoPut(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<void> {

    return this.apiAlbumIdPhotoPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
