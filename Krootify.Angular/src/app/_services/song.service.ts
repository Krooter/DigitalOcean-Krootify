import { ISong } from 'src/app/_models/Song/song';
import { IArtist } from './../_models/Song/artists';
import { ICategory } from './../_models/Song/category';
import { IGenre } from './../_models/Song/genre';
import { map } from 'rxjs/operators';
import { Params } from '../_models/Params/Params';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { IPagination } from '../_models/Params/pagination';
import { IAlbum } from '../_models/Song/albums';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songEvent: ReplaySubject<ISong> = new ReplaySubject<ISong>();
  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  public getSongs(songParams: Params) : Observable<IPagination<ISong> | null>{
    let params = new HttpParams();

    params = params.append('pageIndex', songParams.pageNumber.toString());
    params = params.append('pageSize', songParams.pageSize.toString());

    if(songParams.sort){
      params = params.append('sort', songParams.sort.toString());
    }

    if(songParams.search){
      params = params.append('search', songParams.search.toString());
    }

    if(songParams.genreIdSelected){
      params = params.append('Genre', songParams.genreIdSelected.toString())
    }

    if(songParams.categoryIdSelected){
      params = params.append('Category', songParams.categoryIdSelected.toString())
    }


    return this.http.get<IPagination<ISong>>(this.baseUrl + 'song', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  public getSong(id: number) : Observable<ISong>{
    return this.http.get<ISong>(this.baseUrl + 'song/' + id);
  }

  public getSongGenres() : Observable<IGenre[]>{
    return this.http.get<IGenre[]>(this.baseUrl + 'song/genres');
  }

  public getSongCategories() : Observable<ICategory[]>{
    return this.http.get<ICategory[]>(this.baseUrl + 'song/categories')
  }

  public addSong(values: FormData): Observable<ISong>{
    return this.http.post<ISong>(this.baseUrl + 'song/', values)
  }

  public deleteSong(id: number): Observable<ISong>{
    return this.http.delete<ISong>(this.baseUrl + 'song/' + id)
  }

  public updateSong(values: ISong): Observable<ISong>{
    return this.http.put<ISong>(this.baseUrl + 'song/' + values.id, values)
  }

  public updatePhoto(values: FormData, id: number): Observable<ISong>{
    return this.http.put<ISong>(this.baseUrl + 'song/' + id + '/photo', values);
  }

  public setPlaySong(song: ISong){
    this.songEvent.next(song);
  }

  setRefresh(value: boolean): void {
    this.refresh.next(value);
  } 

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }
}
