import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtistService } from './../../../_services/artist.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  artistCreateForm!: FormGroup;
  readonly photoMaxSize = 10485760;

  constructor(private artistService: ArtistService , private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.artistCreateForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      sceneName: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
      dateOfBirth: new FormControl(new Date(), [Validators.required])
    });
  }

  get photo() { return this.artistCreateForm.get('photo'); }
  
  createArtist(){
    const formData = new FormData();
      formData.append('photo', this.artistCreateForm.get('photo')?.value.files[0], this.artistCreateForm.get('photo')?.value.files[0].name);
      formData.append('firstName', this.artistCreateForm.get('firstName')?.value);
      formData.append('lastName', this.artistCreateForm.get('lastName')?.value);
      formData.append('sceneName', this.artistCreateForm.get('sceneName')?.value);
      formData.append('dateOfBirth', new Date(this.artistCreateForm.get('dateOfBirth')?.value).toLocaleDateString());
      this.artistService.createArtist(formData).subscribe(() => {
        this.artistService.setRefresh(true);
        this.snackBar.open('Artist was added successfully to our collection!', 'Close', {
          duration: 3000
        });
        this.dialog.closeAll();
      }, error => {
        console.log(error);
      })
  }

}
