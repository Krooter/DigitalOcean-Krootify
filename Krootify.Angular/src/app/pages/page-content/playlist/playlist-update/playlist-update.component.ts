import { MatSnackBar } from '@angular/material/snack-bar';
import { IPlayListUpdate } from './../../../../_models/Song/playlistcreate';
import { IPlayList } from './../../../../_models/Song/playlist';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/_services/playlist.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';

@Component({
  selector: 'app-playlist-update',
  templateUrl: './playlist-update.component.html',
  styleUrls: ['./playlist-update.component.scss']
})
export class PlaylistUpdateComponent implements OnInit {
  playList!: IPlayList;
  playListUpdateForm!: FormGroup;
  maxSize = 10485760;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IPlayList, private playListService: PlaylistService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPlaylist();
    this.loadPlayListUpdateForm();
  }

  get name() { return this.playListUpdateForm.get('name'); }

  get photo() { return this.playListUpdateForm.get('photo'); }

  loadPlaylist() {
    this.playListService.getPlayList(this.data.id).subscribe(response => {
      this.playList = response;
      this.loadPlayListUpdateForm();
    }, error => {
      console.log(error);
    })
  }

  loadPlayListUpdateForm(){
    this.playListUpdateForm = new FormGroup({
      name: new FormControl(this.playList?.name, [Validators.required]),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.maxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')])
    });
  }

  uploadFile = (files: any, id: number) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files.value.files[0];
    const formData = new FormData();
    formData.append('photo', fileToUpload, fileToUpload.name);
    formData.append('name', this.name?.value);
    this.playListService.updatePlayList(id, formData).subscribe(() => {
      this.playListService.setRefresh(true);
      this.snackBar.open('Playlist was updated successfully!!', 'Close', {
        duration: 3000
      });
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    })
  }
}
