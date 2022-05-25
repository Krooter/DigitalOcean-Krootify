import { IArtist } from './../_models/Song/artists';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Params } from '../_models/Params/Params';
import { IPagination } from '../_models/Params/pagination';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getArtists(artistParams: Params): Observable<IPagination<IArtist> | null>{
    let params = new HttpParams();

    params = params.append('pageIndex', artistParams.pageNumber.toString());
    params = params.append('pageSize', artistParams.pageSize.toString());

    if(artistParams.search){
      params = params.append('search', artistParams.search.toString());
    }
    return this.http.get<IPagination<IArtist>>(this.baseUrl + 'artist', {observe: 'response', params}).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getArtist(id: number): Observable<IArtist> {
    return this.http.get<IArtist>(this.baseUrl + 'artist/' + id);
  }

  createArtist(values: any): Observable<IArtist>{
    return this.http.post<IArtist>(this.baseUrl + 'artist/', values);
  }

  updateArtist(values: IArtist): Observable<IArtist>{
    return this.http.put<IArtist>(this.baseUrl + 'artist/' + values.id, values);
  }

  updatePhoto(values: any, id: number): Observable<IArtist>{
    return this.http.put<IArtist>(this.baseUrl + 'artist/' + id + '/photo', values)
  }

  deleteArtist(id: number): Observable<IArtist>{
    return this.http.delete<IArtist>(this.baseUrl + 'artist/' + id);
  }

  setRefresh(value: boolean): void {
    this.refresh.next(value);
  } 

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }
}
