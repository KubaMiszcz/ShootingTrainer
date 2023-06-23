import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { IAction } from 'src/app/models/action';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { AppService } from 'src/app/services/app.service';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
  selector: 'app-procedure-tab',
  templateUrl: './procedure-tab.component.html',
  styleUrls: ['./procedure-tab.component.scss'],
})
export class ProcedureTabComponent {
  currentAction$ = new Subject<IAction>();
  isPlaylistPlayed$ = new Subject<boolean>();

  constructor(
    private appSettings: AppSettingsService,
    private appService: AppService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.currentAction$ = audioPlayerService.currentAction$;
    this.isPlaylistPlayed$ = this.audioPlayerService.isPlaylistPlayed$;
  }

  playProcedure() {
    this.appService.playProcedure();
  }

  pauseProcedure() {
    this.appService.stopProcedure();
  }
  
  stopProcedure() {
    this.appService.stopProcedure();
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
