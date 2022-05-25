import { AlbumService } from 'src/app/_services/album.service';
import { ArtistService } from './../../../_services/artist.service';
import { Params } from 'src/app/_models/Params/Params';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISong } from 'src/app/_models/Song/song';
import { IAlbum } from './../../../_models/Song/albums';
import { IArtist } from './../../../_models/Song/artists';
import { IGenre } from './../../../_models/Song/genre';
import { ICategory } from './../../../_models/Song/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { SongService } from 'src/app/_services/song.service';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  displayForm = "none";
  songUpdateForm!: FormGroup;
  photoUpdateForm!: FormGroup;
  categories!: ICategory[];
  params: Params = new Params();
  genres!: IGenre[];
  artists!: IArtist[];
  albums!: IAlbum[];
  songItem!: ISong;
  readonly photoMaxSize = 10485760;

  constructor(private songService: SongService, private artistService: ArtistService, private albumService: AlbumService,
    @Inject(MAT_DIALOG_DATA) public data: ISong, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories();
    this.getGenres();
    this.getAlbums();
    this.getArtists();
    this.getSong();
  }

  getSong(){
    this.songService.getSong(this.data.id).subscribe(response => {
      this.songItem = response;
      this.loadForm();
      this.loadPhotoForm();
    }, error => {
      console.log(error);
    })
  }

  loadForm(){
    this.songUpdateForm = new FormGroup({
      id: new FormControl(this.songItem?.id),
      name: new FormControl(this.songItem?.name, [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      artistId: new FormControl(this.songItem?.artistId, [Validators.required]),
      albumId: new FormControl(this.songItem?.albumId, [Validators.required]),
      songGenreId: new FormControl(this.songItem?.songGenreId, [Validators.required]),
      songCategoryId: new FormControl(this.songItem?.songCategoryId, [Validators.required]),
      releaseDate: new FormControl(this.songItem?.releaseDate, [Validators.required])
    })
  }

  loadPhotoForm(){
    this.photoUpdateForm = new FormGroup({
      id: new FormControl(this.songItem?.id),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
    })
  }

  getCategories(){
    this.songService.getSongCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    });
  }

  getGenres(){
    this.songService.getSongGenres().subscribe(response => {
      this.genres = response;
    }, error => {
      console.log(error);
    });
  }

  getArtists(){
    this.artistService.getArtists(this.params).subscribe(response => {
      if(response != undefined){
        this.artists = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  getAlbums(){
    this.albumService.getAlbums(this.params).subscribe(response => {
      if(response != undefined){
        this.albums = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  get name() { return this.songUpdateForm.get('name'); }
  get artistId() { return this.songUpdateForm.get('artistId'); }
  get albumId() { return this.songUpdateForm.get('albumId'); }
  get songCategoryId() { return this.songUpdateForm.get('songCategoryId'); }
  get songGenreId() { return this.songUpdateForm.get('songGenreId'); }
  get releaseDate() { return this.songUpdateForm.get('releaseDate')}

  get photo() { return this.photoUpdateForm.get('photo'); }

  displayDataForm(){
    this.displayForm = "data";
  }

  displayPhotoForm(){
    this.displayForm = "photo";
  }

  hideForm(){
    this.displayForm = "none";
  }

  updateSong(){
    this.songService.updateSong(this.songUpdateForm.value).subscribe(() =>{
      this.songService.setRefresh(true);
      this.snackBar.open('Song was updated successfully!', 'Close', {
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
    this.songService.updatePhoto(formData, this.songItem?.id).subscribe(() => {
      this.songService.setRefresh(true);
      this.snackBar.open('Song was updated successfully!', 'Close', {
        duration: 3000
      });
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }
}
