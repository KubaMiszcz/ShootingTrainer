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
    let stage = this.getStageByName('start');
    let deadEnd=stage?.nextBlockName?.length === 0

    while (playlist.length < maxLength && !deadEnd) {
      playlist.push(...(stage?.actions ?? []));
      stage = this.getStageByName(stage?.nextBlockName);
      
      deadEnd = !stage?.nextBlockName?.length;
    }

    return playlist;
  }

  getStageByName(name: string | undefined): IStage | undefined {
    return this.appSettings.allStages.find((s) => s.name === name);
  }

  getetDeciderByName(name: string | undefined): IDecider | undefined {
    return this.appSettings.allDeciders.find((s) => s.name === name);
  }
}
