import { PlaylistAddComponent } from '../../pages/page-content/playlist/playlist-add/playlist-add.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from './../../_services/playlist.service';
import { IPlayList } from './../../_models/Song/playlist';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-side-bar',
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.scss']
})
export class NavSideBarComponent implements OnInit {
  playLists!: IPlayList[];

  constructor(private playListService: PlaylistService, private location: Location, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.playListService.getRefresh().subscribe((value: boolean) => {
      this.getPlayLists();
    });
    this.getPlayLists();
  }

  getPlayLists(){
    this.playListService.getPlayLists().subscribe(response => {
      this.playLists = response;
    });
  }
  
  route(path: string){
    this.location.go(path);
  }

  addPlayList(){
    this.dialog.open(PlaylistAddComponent);
  }
}
