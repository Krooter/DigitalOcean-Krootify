import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '../../../_models/Params/Params';
import { ISong } from '../../../_models/Song/song';
import { ISongPlayList } from '../../../_models/Song/songplaylist';
import { PlaylistService } from '../../../_services/playlist.service';
import { SongService } from '../../../_services/song.service';
import { ICategory } from './../../../_models/Song/category';
import { IGenre } from './../../../_models/Song/genre';
import { IPlayList } from './../../../_models/Song/playlist';

@Component({
  selector: 'app-pages',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm!: ElementRef;
  @ViewChild('categoryFilter', { static: true }) categoryFilter!: ElementRef;
  @ViewChild('genreFilter', { static: true }) genreFilter!: ElementRef;
  @ViewChild('grid') grid!: MatGridList;

  songs!: ISong[];
  song!: ISong;
  playlists?: IPlayList[];
  isDisplayed = false;
  params: Params = new Params();
  totalCount: number = 0;
  categories!: ICategory[];
  genres!: IGenre[];
  innerWidth: any;
  sortOption = [
    { name: 'Ascending name', value: 'nameAsc' },
    { name: 'Descending name', value: 'nameDesc' },
    { name: 'Ascending duration', value: 'durationAsc' },
    { name: 'Descending duration', value: 'durationDesc' },
    { name: 'Ascending album', value: 'albumAsc' },
    { name: 'Descending album', value: 'albumDesc' },
  ];

  constructor(
    private songService: SongService,
    private playListService: PlaylistService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.setPageSize();
    this.getSongs();
    this.getCategories();
    this.getGenres();
    this.getPlayLists();
  }

  setPageSize() {
    if (this.innerWidth >= 1680) {
      this.params.pageSize = 21;
    }
    if (this.innerWidth < 1680 && this.innerWidth >= 1476) {
      this.params.pageSize = 12;
    }
    if (this.innerWidth < 1476 && this.innerWidth >= 1280) {
      this.params.pageSize = 10;
    }
    if (this.innerWidth < 1280) {
      this.params.pageSize = 8;
    }
  }

  getPlayLists() {
    this.playListService.getPlayLists().subscribe(
      (response) => {
        this.playlists = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSongs() {
    this.songService.getSongs(this.params).subscribe((response) => {
      if (response != undefined) {
        this.songs = response?.data;
        this.params.pageNumber = response?.pageIndex;
        this.params.pageSize = response?.pageSize;
        this.totalCount = response.count;
      }
    });
  }

  getCategories() {
    this.songService.getSongCategories().subscribe(
      (response) => {
        this.categories = [
          { id: 0, categoryName: 'All categories' },
          ...response,
        ];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGenres() {
    this.songService.getSongGenres().subscribe(
      (response) => {
        this.genres = [{ id: 0, genreName: 'All genres' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  play(songData: ISong): void {
    this.songService.setPlaySong(songData);
  }

  displayFunctions() {
    if (this.isDisplayed) {
      this.isDisplayed = false;
    } else {
      this.isDisplayed = true;
    }
  }

  addSongToPlayList(songId: number, playListId: number) {
    var songPlayList: ISongPlayList = {
      songId: songId,
      playListId: playListId,
    };
    this.playListService.addSongToPlayList(songPlayList).subscribe(
      (response) => {
        this.getSongs();
        this.getPlayLists();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteSongFromPlayList(songId: number, playListId: number) {
    this.playListService.deleteSongFromPlayList(songId, playListId).subscribe(
      (response) => {
        this.getSongs();
        this.getPlayLists();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isSongInPlayList(songId: number, playlist?: IPlayList[]): number {
    let count = 0;
    if (playlist) {
      for (let item of playlist) {
        for (let song of item.songs) {
          if (song.id == songId) {
            count++;
          }
        }
      }
    }
    return count;
  }

  isSongInThisPlayList(songId: number, playList: IPlayList): boolean {
    if (playList) {
      for (let item of playList.songs) {
        if (songId == item.id) {
          return true;
        }
      }
    }
    return false;
  }

  onPageChanged(event: PageEvent) {
    this.params.pageNumber = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.totalCount = event.length;
    this.getSongs();
  }

  onSearch() {
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getSongs();
  }

  onSortSelected(sort: string) {
    this.params.sort = sort;
    this.getSongs();
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.params = new Params();
    this.getSongs();
  }

  onGenreSelect(genre: number) {
    this.params.genreIdSelected = genre;
    this.getSongs();
  }

  onCategorySelect(category: number) {
    this.params.categoryIdSelected = category;
    this.getSongs();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setPageSize();
  }
}
