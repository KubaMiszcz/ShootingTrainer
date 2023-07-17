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
  // currentAction$ = new BehaviorSubject<IAction>({name:'s',audioFileName:'ss'});
  playlist: IAction[] = [];
  isPlaylistPlaying$ = new BehaviorSubject<boolean>(false);
  currentAudio = new Audio();
  isAudioPaused = false;

  constructor(private appSettingsService: AppSettingsService) {
    this.playbackEnded$.subscribe((data) => {
      this.playNextAction();
    });
  }

  playPlaylist() {
    if (this.isAudioPaused) {
      this.currentAudio.play();
    } else {
      this.playNextAction();
    }

    this.isPlaylistPlaying$.next(true);
  }

  pausePlaylist() {
    if (this.isPlaylistPlaying$.value) {
      this.currentAudio.pause();
      this.isAudioPaused = true;
      this.isPlaylistPlaying$.next(false);
    } else {
      this.currentAudio.play();
      this.isAudioPaused = false;
      this.isPlaylistPlaying$.next(true);
    }
  }

  stopPlaylist() {
    this.currentAudio.pause();
    this.isAudioPaused = false;
    this.playlist = [];
    this.playbackEnded$.next('procedure stopped');
    this.isPlaylistPlaying$.next(false);
    this.currentAction$.next({ name: 'press play', audioFileName: '' });
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
