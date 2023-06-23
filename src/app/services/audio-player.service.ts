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
  isPlaylistPlaying$ = new Subject<boolean>();
  currentAudio = new Audio();
  isAudioPaused = false;

  constructor(private appSettingsService: AppSettingsService) {
    this.playbackEnded$.subscribe((data) => {
      this.playNextAction();
    });
  }

  playPlaylist() {
    this.isPlaylistPlaying$.next(true);
    this.playNextAction();
  }

  pausePlaylist() {
    this.isAudioPaused = !this.isAudioPaused;
    if (this.isAudioPaused) {
      this.currentAudio.pause();
    } else {
      this.currentAudio.play();
    }
  }

  stopPlaylist() {
    this.currentAudio.pause();
    this.playlist = [];
    this.playbackEnded$.next('procedure stopped');
    this.isPlaylistPlaying$.next(false);
  }

  playNextAction() {
    if (this.playlist.length === 0) {
      this.isPlaylistPlaying$.next(false);
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

    if (!action.audioFileName.length) {
      action.audioFileName =
        action.name + this.appSettingsService.appData.defaultAudioExtension;
    }

    if (!this.hasFileExtension(action.audioFileName)) {
      action.audioFileName =
        action.audioFileName +
        this.appSettingsService.appData.defaultAudioExtension;
    }

    let path = this.appSettingsService.audioFilesPath + action.audioFileName;
    this.playActionAudio(path);
  }

  playActionAudio(path: string) {
    this.currentAudio = new Audio();
    this.currentAudio.src = path;
    this.currentAudio.addEventListener('ended', () => {
      this.playbackEnded$.next(path + ' ends');
    });

    this.currentAudio.load();
    this.currentAudio.play();
  }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    // audio.src = "../../../assets/audio/alarm.wav";
    // audio.src = '../assets/mywav.wav';
    audio.load();
    audio.play();
  }

  hasFileExtension(fileName: string) {
    return !!_.last(fileName.split('.').slice(1))?.length;
  }
}
