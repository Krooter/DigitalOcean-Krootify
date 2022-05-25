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

import { PlayListToCreateDto } from '../models/play-list-to-create-dto';
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
  static readonly ApiPlayListGetPath = '/api/playlist';

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
   * Path part for operation apiPlayListAddPost
   */
  static readonly ApiPlayListAddPostPath = '/api/PlayList/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListAddPost()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayListAddPost$Response(params?: {
    body?: PlayListToCreateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListAddPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiPlayListAddPost$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiPlayListAddPost(params?: {
    body?: PlayListToCreateDto
  }): Observable<void> {

    return this.apiPlayListAddPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListDeleteIdDelete
   */
  static readonly ApiPlayListDeleteIdDeletePath = '/api/PlayList/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListDeleteIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListDeleteIdDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListDeleteIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiPlayListDeleteIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListDeleteIdDelete(params: {
    id: number;
  }): Observable<void> {

    return this.apiPlayListDeleteIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListAddSongPost
   */
  static readonly ApiPlayListAddSongPostPath = '/api/playlist/add/song';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListAddSongPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListAddSongPost$Response(params?: {
    songId?: number;
    playListId?: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListAddSongPostPath, 'post');
    if (params) {
      rb.query('songId', params.songId, {});
      rb.query('playListId', params.playListId, {});
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
   * To access the full response (for headers, for example), `apiPlayListAddSongPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListAddSongPost(params?: {
    songId?: number;
    playListId?: number;
  }): Observable<void> {

    return this.apiPlayListAddSongPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListDeleteSongDelete
   */
  static readonly ApiPlayListDeleteSongDeletePath = '/api/PlayList/delete/song';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListDeleteSongDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListDeleteSongDelete$Response(params?: {
    songId?: number;
    playListId?: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListDeleteSongDeletePath, 'delete');
    if (params) {
      rb.query('songId', params.songId, {});
      rb.query('playListId', params.playListId, {});
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
   * To access the full response (for headers, for example), `apiPlayListDeleteSongDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPlayListDeleteSongDelete(params?: {
    songId?: number;
    playListId?: number;
  }): Observable<void> {

    return this.apiPlayListDeleteSongDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiPlayListUpdateIdPut
   */
  static readonly ApiPlayListUpdateIdPutPath = '/api/PlayList/update/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPlayListUpdateIdPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListUpdateIdPut$Response(params: {
    id: number;
    body?: { 'Name'?: string | null, 'PhotoUrl'?: string | null }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, PlayListService.ApiPlayListUpdateIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiPlayListUpdateIdPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiPlayListUpdateIdPut(params: {
    id: number;
    body?: { 'Name'?: string | null, 'PhotoUrl'?: string | null }
  }): Observable<void> {

    return this.apiPlayListUpdateIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
