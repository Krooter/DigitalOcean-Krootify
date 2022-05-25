import { PlaylistUpdateComponent } from './../playlist/playlist-update/playlist-update.component';
import { PlaylistAddComponent } from './../playlist/playlist-add/playlist-add.component';
import { IPlayList } from './../../../_models/Song/playlist';
import { PlaylistService } from './../../../_services/playlist.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  items!: IPlayList[];

  constructor(private playListService: PlaylistService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.playListService.getRefresh().subscribe((value: boolean) => {
      this.loadPlaylists();
    });
  }

  loadPlaylists() {
    this.playListService.getPlayLists().subscribe(response => {
      this.items = response;
    }, error => {
      console.log(error);
    })
  }

  playPlayList(item: IPlayList, index: number){
    if(item.songs.length > 0){
      this.playListService.setPlayList(item, index);
    }
    else {
      //toast
    }
  }

  deletePlayList(id: number){
    this.playListService.deletePlayList(id).subscribe(response => {
      this.loadPlaylists();
      this.playListService.setRefresh(true);
    }, error => {
      //toast
      console.log(error)
    })
  }

  updatePlayList(playlist: IPlayList){
    this.dialog.open(PlaylistUpdateComponent, {
      data: {
        id: playlist.id,
        name: playlist.name
      }
    });
  }

  addPlayList(){
    this.dialog.open(PlaylistAddComponent);
  }
}



