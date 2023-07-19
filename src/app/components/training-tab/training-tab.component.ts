import { BehaviorSubject, Subject } from 'rxjs';
import { Component } from '@angular/core';
import { IAction } from 'src/app/models/action';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { AppService } from 'src/app/services/app.service';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
  selector: 'app-training-tab',
  templateUrl: './training-tab.component.html',
  styleUrls: ['./training-tab.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class ProcedureTabComponent {
  currentAction$ = new Subject<IAction>();
  isPlaylistPlaying$ = new BehaviorSubject<boolean>(false);

  constructor(
    private appSettings: AppSettingsService,
    private appService: AppService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.currentAction$ = audioPlayerService.currentAction$;
    this.isPlaylistPlaying$ = this.audioPlayerService.isPlaylistPlaying$;
    this.stopProcedure();
  }

  playProcedure() {
    this.appService.playProcedure();
  }

  pauseProcedure() {
    this.appService.pauseProcedure();
  }

  stopProcedure() {
    this.appService.stopProcedure();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log(event);
    
    if (event.code === 'Space') {
      if (this.isPlaylistPlaying$.value) {
        this.pauseProcedure();
      } else {
        this.playProcedure();
      }
    }
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
