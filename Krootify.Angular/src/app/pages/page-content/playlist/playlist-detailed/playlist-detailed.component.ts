import { IPlayList } from '../../../../_models/Song/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from 'src/app/_services/playlist.service';
import * as moment from 'moment';
import { ISong } from 'src/app/_models/Song/song';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-playlist-detailed',
  templateUrl: './playlist-detailed.component.html',
  styleUrls: ['./playlist-detailed.component.scss']
})
export class PlaylistDetailedComponent implements OnInit {
  playlist!: IPlayList;
  displayedColumns: string[] = ['#', 'NAME', 'ALBUM NAME', 'DATE ADDED', 'DURATION', 'ACTIONS'];
  song!: ISong[];
  sortedData!: ISong[];
  index!: number[];

  constructor(private playListService: PlaylistService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(() => {
      this.loadPlayList();
    });
  }

  loadPlayList(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      this.playListService.getPlayList(parseInt(id)).subscribe(response => {
        this.playlist = response;
        this.song = response.songs;
        this.sortedData = this.playlist.songs.slice();
        this.loadSongs();
      }, error => {
        console.log(error);
      });
    }
  }

  loadSongs(){
    let iter = 0;
    if(this.playlist){
      for(let item of this.playlist.songs){
        this.song[iter] = item;
        this.song[iter].count = iter + 1;
        iter++;
      }
    }
  }

  getPlayListDuration(): string{
    var duration = 0;
    for(let item of this.playlist.songs){
      duration += item.duration;
    }
    return this.getSongDisplayedDuration(duration, 'HH') + ' hr ' + this.getSongDisplayedDuration(duration, 'mm') + ' min';
  }

  playPlayList(item: IPlayList, index: number){
    if(item.songs.length > 0){
      this.playListService.setPlayList(item, index);
    }
    else {
      //toast
    }
  }

  getSongDisplayedDuration(duration: number, format: string = 'mm:ss'): string{
    const momentTime = duration * 1000;
    return moment.utc(momentTime).format(format);
  }

  sortData(sort: Sort) {
    const data = this.playlist.songs.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': 
              return this.compare(a.name, b.name, isAsc);
        case 'album': 
              return this.compare(a.albums, b.albums, isAsc);
        case 'dateAdded': 
              return this.compare(a.dateAdded, b.dateAdded, isAsc);
        case 'duration': 
              return this.compare(a.duration, b.duration, isAsc);
        default: return 0;
      }
    });
  }

  deleteFromPlayList(songId: number, playListId: number){
    this.playListService.deleteSongFromPlayList(songId, playListId).subscribe(() => {
      this.loadPlayList();
    }, error => {
      console.log(error);
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}