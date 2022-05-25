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

import { SongCategoryToReturnDto } from '../models/song-category-to-return-dto';
import { SongGenreToReturnDto } from '../models/song-genre-to-return-dto';
import { SongToReturnDto } from '../models/song-to-return-dto';
import { SongToUpdateDto } from '../models/song-to-update-dto';

@Injectable({
  providedIn: 'root',
})
export class SongService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiSongGet
   */
  static readonly ApiSongGetPath = '/api/Song';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGet$Plain$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<SongToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongGetPath, 'get');
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
        return r as StrictHttpResponse<Array<SongToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGet$Plain(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<SongToReturnDto>> {

    return this.apiSongGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SongToReturnDto>>) => r.body as Array<SongToReturnDto>)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGet$Json$Response(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<StrictHttpResponse<Array<SongToReturnDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongGetPath, 'get');
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
        return r as StrictHttpResponse<Array<SongToReturnDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGet$Json(params?: {
    PageIndex?: number;
    PageSize?: number;
    Category?: number;
    Genre?: number;
    Sort?: string;
    Search?: string;
  }): Observable<Array<SongToReturnDto>> {

    return this.apiSongGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SongToReturnDto>>) => r.body as Array<SongToReturnDto>)
    );
  }

  /**
   * Path part for operation apiSongPost
   */
  static readonly ApiSongPostPath = '/api/Song';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiSongPost$Response(params?: {
    body?: { 'Name': string, 'Song': Blob, 'Photo': Blob, 'ReleaseDate': string, 'ArtistId': number, 'AlbumId': number, 'SongCategoryId': number, 'SongGenreId': number }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongPostPath, 'post');
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
   * To access the full response (for headers, for example), `apiSongPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiSongPost(params?: {
    body?: { 'Name': string, 'Song': Blob, 'Photo': Blob, 'ReleaseDate': string, 'ArtistId': number, 'AlbumId': number, 'SongCategoryId': number, 'SongGenreId': number }
  }): Observable<void> {

    return this.apiSongPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiSongIdGet
   */
  static readonly ApiSongIdGetPath = '/api/Song/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdGet$Plain$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<SongToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdGet$Plain(params: {
    id: number;
  }): Observable<SongToReturnDto> {

    return this.apiSongIdGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SongToReturnDto>) => r.body as SongToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdGet$Json$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<SongToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongIdGetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdGet$Json(params: {
    id: number;
  }): Observable<SongToReturnDto> {

    return this.apiSongIdGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SongToReturnDto>) => r.body as SongToReturnDto)
    );
  }

  /**
   * Path part for operation apiSongIdPut
   */
  static readonly ApiSongIdPutPath = '/api/Song/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongIdPut()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSongIdPut$Response(params: {
    id: number;
    body?: SongToUpdateDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongIdPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSongIdPut$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  apiSongIdPut(params: {
    id: number;
    body?: SongToUpdateDto
  }): Observable<void> {

    return this.apiSongIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiSongIdDelete
   */
  static readonly ApiSongIdDeletePath = '/api/Song/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `apiSongIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongIdDelete(params: {
    id: number;
  }): Observable<void> {

    return this.apiSongIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiSongIdPhotoPut
   */
  static readonly ApiSongIdPhotoPutPath = '/api/Song/{id}/photo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongIdPhotoPut()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiSongIdPhotoPut$Response(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongIdPhotoPutPath, 'put');
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
   * To access the full response (for headers, for example), `apiSongIdPhotoPut$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  apiSongIdPhotoPut(params: {
    id: number;
    body?: { 'Photo': Blob }
  }): Observable<void> {

    return this.apiSongIdPhotoPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation apiSongGenresGet
   */
  static readonly ApiSongGenresGetPath = '/api/Song/genres';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongGenresGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGenresGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<SongGenreToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongGenresGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongGenreToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongGenresGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGenresGet$Plain(params?: {
  }): Observable<SongGenreToReturnDto> {

    return this.apiSongGenresGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SongGenreToReturnDto>) => r.body as SongGenreToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongGenresGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGenresGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<SongGenreToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongGenresGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongGenreToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongGenresGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongGenresGet$Json(params?: {
  }): Observable<SongGenreToReturnDto> {

    return this.apiSongGenresGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SongGenreToReturnDto>) => r.body as SongGenreToReturnDto)
    );
  }

  /**
   * Path part for operation apiSongCategoriesGet
   */
  static readonly ApiSongCategoriesGetPath = '/api/Song/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongCategoriesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongCategoriesGet$Plain$Response(params?: {
  }): Observable<StrictHttpResponse<SongCategoryToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongCategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: 'text/plain'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongCategoryToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongCategoriesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongCategoriesGet$Plain(params?: {
  }): Observable<SongCategoryToReturnDto> {

    return this.apiSongCategoriesGet$Plain$Response(params).pipe(
      map((r: StrictHttpResponse<SongCategoryToReturnDto>) => r.body as SongCategoryToReturnDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiSongCategoriesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongCategoriesGet$Json$Response(params?: {
  }): Observable<StrictHttpResponse<SongCategoryToReturnDto>> {

    const rb = new RequestBuilder(this.rootUrl, SongService.ApiSongCategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'text/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SongCategoryToReturnDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiSongCategoriesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiSongCategoriesGet$Json(params?: {
  }): Observable<SongCategoryToReturnDto> {

    return this.apiSongCategoriesGet$Json$Response(params).pipe(
      map((r: StrictHttpResponse<SongCategoryToReturnDto>) => r.body as SongCategoryToReturnDto)
    );
  }

}
