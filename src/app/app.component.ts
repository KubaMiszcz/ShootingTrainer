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
      this.playStage(data)
    );
  }

  playStage(data: string) {
    console.log(data);
    let actions = this.defaultProcedure[0].actions;
    let action = actions[this.currentActionIdx];

    if (!!action) {
      this.currentActionLabel = action.label;
      // console.log(data);
      this.audioPlayerService.playAudio(
        this.appSettings.audioPath + action.audioFileName
      );
    }
    this.currentActionIdx = this.currentActionIdx + 1;
  }

  playProcedure2() {
    this.currentActionIdx = 0;
    // let actions = this.defaultProcedure[0].actions;
    this.audioPlayerService.playbackEndedBS.next('start');
  }

  playProcedure() {
    let actions = this.defaultProcedure[0].actions;
    this.audioPlayerService.playbackEndedSource.next('start');
    // this.audioPlayerService.playAudio(
    //   this.appSettings.audioPath + actions[idx].audioFileName
    // );

    let idx = 0;
    this.audioPlayerService.playbackEnded$.subscribe((data) => {
      console.log(data);
      let action = actions[idx];
      // console.log(action);

      if (!!action) {
        this.currentActionLabel = action.label;
        // console.log(data);
        this.audioPlayerService.playAudio(
          this.appSettings.audioPath + action.audioFileName
        );
      }
      idx = idx + 1;
    });
  }

  playAudio() {
    let audio = new Audio();
    // audio.src = "../../../assets/audio/alarm.wav";
    audio.src = '../assets/mywav.wav';
    audio.load();
    audio.play();
  }

  // recordAudio() {
  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //   });
  // }
}
