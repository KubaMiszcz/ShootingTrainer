import { Component } from '@angular/core';
import { IStage } from 'src/app/models/stage';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { AppService } from 'src/app/services/app.service';
import { AudioPlayerService } from 'src/app/services/audio-player.service';

@Component({
  selector: 'app-play-procedure-tab',
  templateUrl: './play-procedure-tab.component.html',
  styleUrls: ['./play-procedure-tab.component.scss']
})
export class PlayProcedureTabComponent {
  defaultProcedure: IStage[];
  currentActionLabel = '';
  currentActionIdx = 0;
  currentStageIdx = 0;

  constructor(
    private appSettings: AppSettingsService,
    private appService: AppService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.defaultProcedure = appSettings?.defaultProcedure;

    this.audioPlayerService.playbackEndedBS.subscribe((data) =>
      this.playAction(data)
    );
  }

  private playAction(data: string) {
    // console.log(data);
    let actions = this.defaultProcedure[this.currentStageIdx]?.actions ?? [];
    let action = actions[this.currentActionIdx];

    if (!!action) {
      setTimeout(() => {
        this.currentActionLabel = action.name;
        console.log(this.currentActionLabel);
        this.audioPlayerService.playAction(
          this.appSettings.audioFilesPath + action.audioFileName
        );
      }, Number(action?.delay_sec) * 1000);
    }

    this.currentActionIdx = this.currentActionIdx + 1;
  }

  playStage() {
    this.currentActionIdx = 0;
    this.audioPlayerService.playbackEndedBS.next('start');
  }

  playProcedure() {
    this.currentStageIdx = 0;

    this.defaultProcedure.forEach(stage => {
      console.log(stage);
      
      this.playStage();
      this.currentStageIdx = this.currentStageIdx + 1;
    });
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
