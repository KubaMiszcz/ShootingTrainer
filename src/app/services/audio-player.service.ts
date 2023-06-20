import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  playbackEndedSource = new Subject<string>();
  playbackEndedBS = new BehaviorSubject<string>('');
  playbackEnded$ = this.playbackEndedSource.asObservable();

  constructor() {
    // this.audio initialization
    // this.audio.addEventListener('ended', () => this.playbackEndedSource.next());
  }

  // play(path: string): void {
  //     this.audio.src = path;
  //     this.audio.load();
  //     this.audio.play();
  // }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.addEventListener('ended', () =>{
      this.playbackEndedSource.next('ended' + path);
      this.playbackEndedBS.next('ended' + path);
    }
    );
    audio.load();
    audio.play();
  }

  // playAudio2(path: string) {
  //   let audio = new Audio();
  //   audio.src = path;
  //   audio.addEventListener('ended', () =>{
  //     this.playbackEndedBS.next('ended' + path);
  //   }
  //   );
  //   audio.load();
  //   audio.play();
  // }
}


