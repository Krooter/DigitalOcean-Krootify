import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPagination } from '../_models/Params/pagination';
import { IAlbum } from '../_models/Song/albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAlbums(AlbumParams: Params): Observable<IPagination<IAlbum> | null>{
    let params = new HttpParams();

    params = params.append('pageIndex', AlbumParams.pageNumber.toString());
    params = params.append('pageSize', AlbumParams.pageSize.toString());

    if(AlbumParams.search){
      params = params.append('search', AlbumParams.search.toString());
    }
    return this.http.get<IPagination<IAlbum>>(this.baseUrl + 'Album', {observe: 'response', params}).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getAlbum(id: number): Observable<IAlbum> {
    return this.http.get<IAlbum>(this.baseUrl + 'album/' + id);
  }

  createAlbum(values: any): Observable<IAlbum>{
    return this.http.post<IAlbum>(this.baseUrl + 'album/', values);
  }

  updateAlbum(values: IAlbum): Observable<IAlbum>{
    return this.http.put<IAlbum>(this.baseUrl + 'album/' + values.id, values);
  }

  updatePhoto(values: any, id: number): Observable<IAlbum>{
    return this.http.put<IAlbum>(this.baseUrl + 'album/' + id + '/photo', values)
  }

  deleteAlbum(id: number): Observable<IAlbum>{
    return this.http.delete<IAlbum>(this.baseUrl + 'album/' + id);
  }

  setRefresh(value: boolean): void {
    this.refresh.next(value);
  } 

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }
}
