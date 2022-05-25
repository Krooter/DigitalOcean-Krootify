import { AlbumService } from 'src/app/_services/album.service';
import { ArtistService } from './../../../_services/artist.service';
import { Params } from 'src/app/_models/Params/Params';
import { MatDialog } from '@angular/material/dialog';
import { IArtist } from './../../../_models/Song/artists';
import { IAlbum } from './../../../_models/Song/albums';
import { IGenre } from './../../../_models/Song/genre';
import { ICategory } from './../../../_models/Song/category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SongService } from './../../../_services/song.service';
import { Component, OnInit } from '@angular/core';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  songCreateForm!: FormGroup;
  readonly songMaxSize = 52428800;
  readonly photoMaxSize = 10485760;
  categories!: ICategory[];
  genres!: IGenre[];
  albums!: IAlbum[];
  artists!: IArtist[];
  params: Params = new Params();

  constructor(private songService: SongService, private artistService: ArtistService, private albumService: AlbumService,
    private dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadCategories();
    this.loadGenres();
    this.loadAlbums();
    this.loadArtists();
  }

  loadForm(){
    this.songCreateForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]),
      artistId: new FormControl('', [Validators.required]),
      albumId: new FormControl('', [Validators.required]),
      songGenreId: new FormControl('', [Validators.required]),
      songCategoryId: new FormControl('', [Validators.required]),
      song: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.songMaxSize), requiredFileType('[^\\s]+(.*?)\\.(mp3)$')]),
      photo: new FormControl('', [Validators.required, FileValidator.maxContentSize(this.photoMaxSize), requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$')]),
      releaseDate: new FormControl(new Date(), [Validators.required])
    })
  }

  loadCategories(){
    this.songService.getSongCategories().subscribe(response => {
      this.categories = response;
    }, error => {
      console.log(error);
    });
  }

  loadGenres(){
    this.songService.getSongGenres().subscribe(response => {
      this.genres = response;
    }, error => {
      console.log(error);
    });
  }

  loadArtists(){
    this.artistService.getArtists(this.params).subscribe(response => {
      if(response != undefined){
        this.artists = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  loadAlbums(){
    this.albumService.getAlbums(this.params).subscribe(response => {
      if(response != undefined){
        this.albums = response.data;
      }
    }, error => {
      console.log(error);
    });
  }

  get name() { return this.songCreateForm.get('name'); }
  get song() { return this.songCreateForm.get('song'); }
  get artistId() { return this.songCreateForm.get('artistId'); }
  get albumId() { return this.songCreateForm.get('albumId'); }
  get songCategoryId() { return this.songCreateForm.get('songCategoryId'); }
  get songGenreId() { return this.songCreateForm.get('songGenreId'); }
  get photo() { return this.songCreateForm.get('photo'); }
  get releaseDate() { return this.songCreateForm.get('releaseDate')}

  addSong(){
    const formData = new FormData();
    formData.append('photo', this.songCreateForm.get('photo')?.value.files[0], this.songCreateForm.get('photo')?.value.files[0].name);
    formData.append('song', this.songCreateForm.get('song')?.value.files[0], this.songCreateForm.get('song')?.value.files[0].name);
    formData.append('name', this.songCreateForm.get('name')?.value);
    formData.append('artistId', this.songCreateForm.get('artistId')?.value);
    formData.append('songCategoryId', this.songCreateForm.get('songCategoryId')?.value);
    formData.append('songGenreId', this.songCreateForm.get('songGenreId')?.value);
    formData.append('albumId', this.songCreateForm.get('albumId')?.value);
    formData.append('releaseDate', new Date(this.songCreateForm.get('releaseDate')?.value).toLocaleDateString());
    this.songService.addSong(formData).subscribe(() => {
      this.songService.setRefresh(true);
      this.dialog.closeAll();
      this._snackBar.open('Song was added successfully to our collection!', 'Close', {
        duration: 3000
      });
    }, error => {
      console.log(error);
    })
  }
}
