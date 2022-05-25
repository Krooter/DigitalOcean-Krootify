import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';
import { AlbumService } from 'src/app/_services/album.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  albumCreateForm!: FormGroup;
  readonly photoMaxSize = 10485760;

  constructor(private albumService: AlbumService , private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.albumCreateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
      releaseDate: new FormControl(new Date(), [Validators.required])
    });
  }

  get photo() { return this.albumCreateForm.get('photo'); }
  get releaseDate() { return this.albumCreateForm.get('releaseDate'); }
  get description() { return this.albumCreateForm.get('description'); }
  
  createAlbum(){
    const formData = new FormData();
      formData.append('photo', this.albumCreateForm.get('photo')?.value.files[0], this.albumCreateForm.get('photo')?.value.files[0].name);
      formData.append('name', this.albumCreateForm.get('name')?.value);
      formData.append('description', this.albumCreateForm.get('description')?.value);
      formData.append('releaseDate', new Date(this.albumCreateForm.get('releaseDate')?.value).toLocaleDateString());
      this.albumService.createAlbum(formData).subscribe(() => {
        this.albumService.setRefresh(true);
        this.snackBar.open('Album was added successfully to our collection!', 'Close', {
          duration: 3000
        });
        this.dialog.closeAll();
      }, error => {
        console.log(error);
      })
  }

}
