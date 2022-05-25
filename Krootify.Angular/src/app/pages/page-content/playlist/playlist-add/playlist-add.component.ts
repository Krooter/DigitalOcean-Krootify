import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlaylistService } from './../../../../_services/playlist.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styleUrls: ['./playlist-add.component.scss']
})
export class PlaylistAddComponent implements OnInit {
  playListAddForm!: FormGroup;
  readonly maxSize = 10485760;

  constructor(private playListService: PlaylistService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createPlayListForm();
  }

  createPlayListForm() {
    this.playListAddForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.maxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')])
    })
  }

  get name() { return this.playListAddForm.get('name'); }

  get photo() { return this.playListAddForm.get('photo'); }


  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files.value.files[0];
    const formData = new FormData();
    formData.append('photo', fileToUpload, fileToUpload.name);
    formData.append('name', this.name?.value);
    this.playListService.addPlayList(formData).subscribe(response => {
      this.playListService.setRefresh(true);
      this.snackBar.open('Playlist was added successfully to our collection!', 'Close', {
        duration: 3000
      });
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    })
  }
}
