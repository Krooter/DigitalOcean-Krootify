import { MatSnackBar } from '@angular/material/snack-bar';
import { IArtist } from './../../../_models/Song/artists';
import { ArtistService } from './../../../_services/artist.service';
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
  artistUpdateForm!: FormGroup;
  photoUpdateForm!: FormGroup;
  params: Params = new Params();
  artist!: IArtist;

  readonly photoMaxSize = 10485760;

  constructor(private artistService: ArtistService, @Inject(MAT_DIALOG_DATA) public data: IArtist, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getArtist();
  }

  getArtist(){
    this.artistService.getArtist(this.data.id).subscribe(response => {
      this.artist = response;
      this.loadArtistForm();
      this.loadPhotoForm();
    }, error => {
      console.log(error);
    })
  }

  loadArtistForm(){
    this.artistUpdateForm = new FormGroup({
      id: new FormControl(this.artist?.id),
      firstName: new FormControl(this.artist?.firstName, [Validators.required]),
      lastName: new FormControl(this.artist?.lastName, [Validators.required]),
      sceneName: new FormControl(this.artist?.sceneName, [Validators.required]),
      dateOfBirth: new FormControl(this.artist?.dateOfBirth, [Validators.required])
    })
  }

  loadPhotoForm(){
    this.photoUpdateForm = new FormGroup({
      id: new FormControl(this.artist?.id),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
    })
  }

  get photo() { return this.photoUpdateForm.get('photo'); }
  get dateOfBirth() { return this.photoUpdateForm.get('dateOfBirth'); }

  displayDataForm(){
    this.displayForm = "data";
  }

  displayPhotoForm(){
    this.displayForm = "photo";
  }

  hideForm(){
    this.displayForm = "none";
  }

  updateArtist(){
    this.artistService.updateArtist(this.artistUpdateForm.value).subscribe(() =>{
      this.artistService.setRefresh(true);
      this.snackBar.open('Artist was updated successfully!', 'Close', {
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
    this.artistService.updatePhoto(formData, this.artist?.id).subscribe(() => {
      this.artistService.setRefresh(true);
      this.snackBar.open('Artist was updated successfully!', 'Close', {
        duration: 3000
      });
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

}
