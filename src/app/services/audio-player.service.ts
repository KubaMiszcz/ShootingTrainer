import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { IAction } from '../models/action';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  playbackEnded$ = new Subject<string>();
  currentAction$ = new Subject<IAction>();
  playlist: IAction[] = [];
  isPlaylistPlayed$ = new Subject<boolean>();

  constructor(private appSettingsService: AppSettingsService) {
    this.playbackEnded$.subscribe((data) => {
      this.playNextAction();
    });
  }

  playPlaylist() {
    this.isPlaylistPlayed$.next(true);
    this.playNextAction();
  }

  stopPlaylist() {
    this.playlist = [];
    this.playbackEnded$.next('procedure stopped');
    this.isPlaylistPlayed$.next(false);
  }

  playNextAction() {
    if (this.playlist.length === 0) {
      this.isPlaylistPlayed$.next(false);
      return;
    }

    let action = this.playlist.shift();

    if (!!action) {
      this.playAction(action);
    }
  }

  playAction(action: IAction) {
    console.log(action.name);
    this.currentAction$.next(action);

    if (this.isFileWithExtension(action.audioFileName)) {
      action.audioFileName =
        action.audioFileName +
        this.appSettingsService.appData.defaultAudioExtension;
    }

    let path = this.appSettingsService.audioFilesPath + action.audioFileName;
    this.playActionAudio(path);
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

  isFileWithExtension(fileName: string) {
    return !_.last(fileName.split('.'))?.length;
  }
}
