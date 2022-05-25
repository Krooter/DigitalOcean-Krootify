import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StreamState } from '../_models/Song/streamstate';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private stop$ = new Subject();
  private audioObj = new Audio();
  audioEvents = [
    'ended',
    'error',
    'play',
    'playing',
    'pause',
    'timeupdate',
    'canplay',
    'loadedmetadata',
    'loadstart',
    'volumechange',
    'canplaythroughs',
    'progress',
  ];
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    pause: false,
    volume: 0,
    ended: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  constructor(private cookieService: CookieService) {}

  private streamObservable(url: string) {
    return new Observable((observer) => {
      this.audioObj.src = url;
      this.audioObj.load();
      this.play();
      if (this.cookieService.get('volume') == '') {
        this.audioObj.volume = 0.3;
        this.state.volume = 0.3;
      } else {
        this.audioObj.volume = parseFloat(this.cookieService.get('volume'));
        this.state.volume = parseFloat(this.cookieService.get('volume'));
      }
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      if (this.state.playing == false) {
        return () => {
          this.audioObj.pause();
          this.audioObj.currentTime = 0;
          this.removeEvents(this.audioObj, this.audioEvents, handler);
          this.resetState();
        };
      } else {
        return () => {
          this.play();
        };
      }
    });
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play().catch((error) => {
      console.log(error);
    });
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  mute() {
    this.cookieService.set('oldVolume', this.audioObj.volume.toString());
    this.audioObj.volume = 0;
    this.state.volume = 0;
  }

  unMute() {
    var volume = parseFloat(this.cookieService.get('oldVolume'));
    this.audioObj.volume = volume;
    this.state.volume = volume;
  }

  volume(event: any) {
    this.audioObj.volume = event.value;
    this.cookieService.set('volume', event.value);
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  private formatTime(time: number, format: string = 'mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'volumechange':
        this.state.volume = this.audioObj.volume;
        this.cookieService.set('volume', this.audioObj.volume.toString());
        break;
      case 'playing':
        this.state.pause = false;
        this.state.playing = true;
        break;
      case 'pause':
        this.state.pause = true;
        this.state.playing = false;
        break;
      case 'ended':
        this.state.ended = true;
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        localStorage.setItem(
          'timeStopped',
          this.audioObj.currentTime.toString()
        );
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      pause: false,
      volume: 0,
      ended: false,
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }
}
