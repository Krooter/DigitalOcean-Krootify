import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISongPlayList } from '../_models/Song/SongPlayList';
import { IPlayList } from './../_models/Song/playlist';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  playlistEvent: ReplaySubject<IPlayList> = new ReplaySubject<IPlayList>();
  refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlayLists(): Observable<IPlayList[]> {
    return this.http.get<IPlayList[]>(this.baseUrl + 'playlist');
  }

  getPlayList(id: number): Observable<IPlayList> {
    return this.http.get<IPlayList>(this.baseUrl + 'playlist/' + id);
  }

  addSongToPlayList(songPlayList: ISongPlayList): Observable<ISongPlayList> {
    return this.http.post<ISongPlayList>(
      this.baseUrl + 'playlist/song',
      songPlayList
    );
  }

  deleteSongFromPlayList(
    songId: number,
    playListId: number
  ): Observable<IPlayList> {
    return this.http.delete<IPlayList>(
      this.baseUrl + 'playlist/' + playListId + '/song/' + songId
    );
  }

  deletePlayList(playListId: number): Observable<IPlayList> {
    return this.http.delete<IPlayList>(this.baseUrl + 'playlist/' + playListId);
  }

  addPlayList(playList: FormData): Observable<IPlayList> {
    return this.http.post<IPlayList>(this.baseUrl + 'playlist', playList);
  }

  updatePlayList(id: number, playList: FormData): Observable<IPlayList> {
    return this.http.put<IPlayList>(this.baseUrl + 'playlist/' + id, playList);
  }

  setRefresh(value: boolean): void {
    this.refresh.next(value);
  }

  setPlayList(playlist: IPlayList, songIndex: number) {
    playlist.index = songIndex;
    this.playlistEvent.next(playlist);
  }

  getRefresh(): Observable<boolean> {
    return this.refresh.asObservable();
  }
}
