import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';
import { IStage } from '../models/stage';
import { IDecider } from '../models/decider';
import { IAction } from '../models/action';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private appSettings: AppSettingsService,
    private audioPlayerService: AudioPlayerService
  ) {}

  playProcedure() {
    let playlist = this.createPlaylist(this.appSettings.maxPlaylistLength);
    this.audioPlayerService.playlist = playlist;
    this.audioPlayerService.playPlaylist();
  }

  createPlaylist(maxLength: number): IAction[] {
    let playlist = [];
    let stage = this.getStagebyName('start');
    let deadEnd=stage?.nextBlockName?.length === 0

    while (playlist.length < maxLength && !deadEnd) {
      playlist.push(...(stage?.actions ?? []));
      deadEnd = !stage?.nextBlockName?.length;
      stage = this.getStagebyName(stage?.nextBlockName);
    }

    return playlist;
  }

  getStagebyName(name: string | undefined): IStage | undefined {
    return this.appSettings.allStages.find((s) => s.name === name);
  }

  getetDeciderbyName(name: string | undefined): IDecider | undefined {
    return this.appSettings.allDeciders.find((s) => s.name === name);
  }
}
