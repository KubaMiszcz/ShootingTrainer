import { Component } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { AppService } from 'src/app/services/app.service';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
  selector: 'app-play-procedure-tab',
  templateUrl: './play-procedure-tab.component.html',
  styleUrls: ['./play-procedure-tab.component.scss'],
})
export class PlayProcedureTabComponent {
  currentActionName = '';

  constructor(
    private appSettings: AppSettingsService,
    private appService: AppService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.audioPlayerService.currentActionName$.subscribe(
      (name) => (this.currentActionName = name)
    );
    }

    playProcedure() {
      this.appService.playProcedure();
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
