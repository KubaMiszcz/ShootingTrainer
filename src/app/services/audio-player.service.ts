import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  playbackEndedBS = new BehaviorSubject<string>('');

  constructor() {}

  playAction(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.addEventListener('ended', () => {
      this.playbackEndedBS.next('ended' + path);
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
