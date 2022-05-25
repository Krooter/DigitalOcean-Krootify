import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlbum } from './../../../_models/Song/albums';
import { AlbumService } from './../../../_services/album.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params } from 'src/app/_models/Params/Params';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  displayForm = "none";
  albumUpdateForm!: FormGroup;
  photoUpdateForm!: FormGroup;
  params: Params = new Params();
  album!: IAlbum;

  readonly photoMaxSize = 10485760;

  constructor(private albumService: AlbumService, @Inject(MAT_DIALOG_DATA) public data: IAlbum, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(){
    this.albumService.getAlbum(this.data.id).subscribe(response => {
      this.album = response;
      this.loadAlbumForm();
      this.loadPhotoForm();
    }, error => {
      console.log(error);
    })
  }

  loadAlbumForm(){
    this.albumUpdateForm = new FormGroup({
      id: new FormControl(this.album?.id),
      name: new FormControl(this.album?.name, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl(this.album?.description, [Validators.required, Validators.maxLength(1000)]),
      releaseDate: new FormControl(this.album?.releaseDate, [Validators.required])
    })
  }

  loadPhotoForm(){
    this.photoUpdateForm = new FormGroup({
      id: new FormControl(this.album?.id),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
    })
  }

  get photo() { return this.photoUpdateForm.get('photo'); }
  get releaseDate() { return this.albumUpdateForm.get('releaseDate'); }
  get description() { return this.albumUpdateForm.get('description'); }

  displayDataForm(){
    this.displayForm = "data";
  }

  displayPhotoForm(){
    this.displayForm = "photo";
  }

  hideForm(){
    this.displayForm = "none";
  }

  updateAlbum(){
    this.albumService.updateAlbum(this.albumUpdateForm.value).subscribe(() =>{
      this.albumService.setRefresh(true);
      this.snackBar.open('Album was updated successfully!', 'Close', {
        duration: 3000
      });
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

  updatePhoto(){
    const formData = new FormData();
    formData.append('photo', this.photoUpdateForm.get('photo')?.value.files[0], this.photoUpdateForm.get('photo')?.value.files[0].name);
    this.albumService.updatePhoto(formData, this.album?.id).subscribe(() => {
      this.snackBar.open('Album was updated successfully!', 'Close', {
        duration: 3000
      });
      this.albumService.setRefresh(true);
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

}
