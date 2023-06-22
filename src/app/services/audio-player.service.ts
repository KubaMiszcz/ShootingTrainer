import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAction } from '../models/action';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  playbackEnded$ = new Subject<string>();
  currentActionName$ = new Subject<string>();
  playlist: IAction[] = [];

  constructor(private appSettingsService: AppSettingsService) {
    this.playbackEnded$.subscribe((data) => {
      this.playNextAction();
    });
  }

  playPlaylist() {
    this.playNextAction();
  }

  playNextAction() {
    if (this.playlist.length === 0) {
      return;
    }

    let action = this.playlist.shift();

    if (!!action) {
      this.playAction(action);
    }
  }

  playAction(action: IAction) {
    console.log(action.name);
    this.currentActionName$.next(action.name);
    this.playActionAudio(
      this.appSettingsService.audioFilesPath + action.audioFileName
    );
  }

  playActionAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.addEventListener('ended', () => {
      this.playbackEnded$.next(path + ' ends');
    });
    audio.load();
    audio.play();
  }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    // audio.src = "../../../assets/audio/alarm.wav";
    // audio.src = '../assets/mywav.wav';
    audio.load();
    audio.play();
  }
}
