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

import { PlayListSongToCreateDto } from '../models/play-list-song-to-create-dto';
import { PlayListToReturnDto } from '../models/play-list-to-return-dto';

@Injectable({
  providedIn: 'root',
})
export class PlayListService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPlayListGet
   */
  static readonly ApiPlayListGetPath = '/api/PlayList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListGet$Plain$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<PlayListToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListGetPath, 'get');
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
        return r as StrictHttpResponse<Array<PlayListToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayListGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListGet$Plain(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<PlayListToReturnDto>> {

    return this.apiPlayListGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PlayListToReturnDto>>) => r.body as Array<PlayListToReturnDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListGet$Json$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<PlayListToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListGetPath, 'get');
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
        return r as StrictHttpResponse<Array<PlayListToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayListGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListGet$Json(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<PlayListToReturnDto>> {

    return this.apiPlayListGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PlayListToReturnDto>>) => r.body as Array<PlayListToReturnDto>)
    );
  }

  /**
   * Path part for operation apiPlayListPost
   */
  static readonly ApiPlayListPostPath = '/api/PlayList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListPost$Response(params?: {
    body?: { 'Name': string, 'Photo': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPlayListPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListPost(params?: {
    body?: { 'Name': string, 'Photo': Blob }
  }): Observable<void> {

    return this.apiPlayListPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListIdGet
   */
  static readonly ApiPlayListIdGetPath = '/api/PlayList/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PlayListToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayListToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayListIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdGet$Plain(params: {
    id: number;
  }): Observable<PlayListToReturnDto> {

    return this.apiPlayListIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<PlayListToReturnDto>) => r.body as PlayListToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<PlayListToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PlayListToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPlayListIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdGet$Json(params: {
    id: number;
  }): Observable<PlayListToReturnDto> {

    return this.apiPlayListIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<PlayListToReturnDto>) => r.body as PlayListToReturnDto)
    );
  }

  /**
   * Path part for operation apiPlayListIdPut
   */
  static readonly ApiPlayListIdPutPath = '/api/PlayList/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListIdPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListIdPut$Response(params: {
    id: number;
    body?: { 'Name': string, 'Photo': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiPlayListIdPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListIdPut(params: {
    id: number;
    body?: { 'Name': string, 'Photo': Blob }
  }): Observable<void> {

    return this.apiPlayListIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListIdDelete
   */
  static readonly ApiPlayListIdDeletePath = '/api/PlayList/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiPlayListIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListIdDelete(params: {
    id: number;
  }): Observable<void> {

    return this.apiPlayListIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListSongPost
   */
  static readonly ApiPlayListSongPostPath = '/api/PlayList/song';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListSongPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayListSongPost$Response(params?: {
    body?: PlayListSongToCreateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListSongPostPath, 'post');
    if (params) {
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
   * To access the full response (for headers, for example), `apiPlayListSongPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayListSongPost(params?: {
    body?: PlayListSongToCreateDto
  }): Observable<void> {

    return this.apiPlayListSongPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListPlayListIdSongSongIdDelete
   */
  static readonly ApiPlayListPlayListIdSongSongIdDeletePath = '/api/PlayList/{playListId}/song/{songId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListPlayListIdSongSongIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListPlayListIdSongSongIdDelete$Response(params: {
    songId: number;
    playListId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListPlayListIdSongSongIdDeletePath, 'delete');
    if (params) {
      rb.path('songId', params.songId, {});
      rb.path('playListId', params.playListId, {});
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
   * To access the full response (for headers, for example), `apiPlayListPlayListIdSongSongIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListPlayListIdSongSongIdDelete(params: {
    songId: number;
    playListId: number;
  }): Observable<void> {

    return this.apiPlayListPlayListIdSongSongIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
