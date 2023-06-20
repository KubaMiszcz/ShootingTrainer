import { AppService } from './services/app.service';
import { Component } from '@angular/core';
import { AppSettingsService } from './services/app-settings.service';
import { IStage } from './models/stage';
import { AudioPlayerService } from './services/audio-player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ShootingTimer';
  defaultProcedure: IStage[];
  currentActionLabel = '';
  currentActionIdx = 0;

  constructor(
    private appSettings: AppSettingsService,
    private appService: AppService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.defaultProcedure = appSettings.defaultProcedure;

    this.audioPlayerService.playbackEndedBS.subscribe((data) =>
      this.playAction(data)
    );
  }

  private playAction(data: string) {
    console.log(data);
    let actions = this.defaultProcedure[0].actions;
    let action = actions[this.currentActionIdx];

    if (!!action) {
      setTimeout(() => {
        this.currentActionLabel = action.label;
        this.audioPlayerService.playAction(
          this.appSettings.audioPath + action.audioFileName
        );
      }, Number(action?.delay_sec) * 1000);
    }

    this.currentActionIdx = this.currentActionIdx + 1;
  }

  executeStage() {
    this.currentActionIdx = 0;
    this.audioPlayerService.playbackEndedBS.next('start');
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
