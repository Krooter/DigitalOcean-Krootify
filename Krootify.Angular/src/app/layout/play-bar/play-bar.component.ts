import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StreamState } from 'src/app/_models/Song/streamstate';
import { PlayerService } from 'src/app/_services/player.service';
import { SongService } from 'src/app/_services/song.service';
import { ISong } from '../../_models/Song/song';
import { IPlayList } from './../../_models/Song/playlist';
import { PlaylistService } from './../../_services/playlist.service';

@Component({
  selector: 'app-play-bar',
  templateUrl: './play-bar.component.html',
  styleUrls: ['./play-bar.component.scss'],
})
export class PlayBarComponent implements OnInit, OnDestroy {
  song!: ISong;
  playlist!: IPlayList;
  songSubscription?: Subscription;
  playListSubscription?: Subscription;
  state?: StreamState;
  currentIndex: number = 0;
  lastplay!: string | null;
  test!: number | null;
  isMobileView: boolean;
  isDetailedView: boolean = false;

  constructor(
    private songService: SongService,
    private playerService: PlayerService,
    private playListService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.getState();
    this.loadSong();
    this.getSong();
    this.getPlayList();
    this.lastplay = localStorage.getItem('lastplay');
    this.isMobileView = window.innerWidth < 768;
  }

  ngOnDestroy(): void {
    this.playerService.stop();
    this.songSubscription?.unsubscribe();
    this.playListSubscription?.unsubscribe();
  }

  getState() {
    this.playerService.getState().subscribe((state) => {
      this.state = state;
      if (
        state.ended &&
        this.getPlayListLength() > 0 &&
        this.currentIndex < this.getPlayListLength() &&
        this.lastplay == 'playlist'
      ) {
        this.skip_next();
      }
    });
  }

  getSong() {
    this.songSubscription = this.songService.songEvent.subscribe(
      (songEvent) => {
        this.song = songEvent;
        this.stop();
        this.playStream(songEvent.songUrl);
        localStorage.setItem('songId', this.song.id.toString());
        localStorage.setItem('lastplay', 'song');
        this.lastplay = 'song';
      }
    );
  }

  getPlayList() {
    this.playListSubscription = this.playListService.playlistEvent.subscribe(
      (playListEvent) => {
        this.playlist = playListEvent;
        this.stop();
        this.playStream(playListEvent.songs[this.playlist.index].songUrl);
        this.song = playListEvent.songs[this.playlist.index];
        this.currentIndex = this.playlist.index;
        localStorage.setItem('playListId', playListEvent.id.toString());
        localStorage.setItem('lastplay', 'playlist');
        localStorage.setItem('playListIndex', this.currentIndex.toString());
        this.lastplay = 'playlist';
      }
    );
  }

  loadSong() {
    let id = localStorage.getItem('songId');
    let timeStopped = localStorage.getItem('timeStopped');
    let playlistId = localStorage.getItem('playListId');
    let lastplay = localStorage.getItem('lastplay');
    let index = localStorage.getItem('playListIndex');
    if (playlistId != null && lastplay == 'playlist') {
      this.playListService
        .getPlayList(parseInt(playlistId))
        .subscribe((response) => {
          this.playlist = response;
          if (timeStopped != null && index != null) {
            this.currentIndex = parseInt(index);
            this.playStream(response.songs[parseInt(index)].songUrl);
            this.pause();
            this.song = response.songs[parseInt(index)];
            this.playerService.seekTo(parseInt(timeStopped));
          }
        });
    }
    if (id != null && lastplay == 'song') {
      this.songService.getSong(parseInt(id)).subscribe((response) => {
        this.song = response;
        if (timeStopped != null) {
          this.playStream(response.songUrl);
          this.pause();
          this.playerService.seekTo(parseInt(timeStopped));
        }
      });
    }
  }

  playStream(url: string) {
    this.playerService.playStream(url).subscribe(() => {});
  }

  pause() {
    this.playerService.pause();
  }

  play() {
    this.playerService.play();
  }

  stop() {
    this.playerService.stop();
  }

  mute() {
    this.playerService.mute();
  }

  unMute() {
    this.playerService.unMute();
  }

  volume(event: any) {
    this.playerService.volume(event);
  }

  seekTo(event: any) {
    this.playerService.seekTo(event.value);
  }

  skip_next() {
    if (this.currentIndex <= this.playlist.songs.length) {
      this.currentIndex++;
      this.stop();
      this.song = this.playlist.songs[this.currentIndex];
      this.playStream(this.playlist.songs[this.currentIndex].songUrl);
      localStorage.setItem('playListIndex', this.currentIndex.toString());
    }
  }

  skip_previous() {
    if (this.currentIndex >= 0) {
      this.currentIndex--;
      this.stop();
      this.song = this.playlist.songs[this.currentIndex];
      this.playStream(this.playlist.songs[this.currentIndex].songUrl);
      localStorage.setItem('playListIndex', this.currentIndex.toString());
    }
  }

  getPlayListLength() {
    if (this.playlist) {
      return this.playlist.songs.length - 1;
    } else {
      return 0;
    }
  }

  expandDetails() {
    this.isDetailedView = !this.isDetailedView;
    if (this.isDetailedView) {
      this.functiondisable();
    }
  }

  functiondisable() {
    // To get the scroll position of current webpage
    var TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    var LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;

    // if scroll happens, set it to the previous value
    (window as any).onscroll = function () {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobileView = window.innerWidth < 768;
  }
}
