import { IBlock } from './../models/block';
import { Injectable } from '@angular/core';
import { IStage } from '../models/stage';
import { IAction } from '../models/action';
import { IDecider } from '../models/decider';
import { IAppData } from '../models/appData';
import { APP_DATA_JSON } from 'src/assets/application-default-data';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  audioFilesPath = '';
  maxPlaylistLength: number;
  appData: IAppData;
  emptyAudioFileName = '';

  constructor() {
    this.appData = APP_DATA_JSON;
    this.audioFilesPath = this.appData.audioFilesPath ?? '';
    this.emptyAudioFileName = this.appData.emptyAudioFileName ?? '';
    this.maxPlaylistLength = this.appData.maxPlaylistLength ?? 50;
  }

  generateJSON(): string {
    let data = this.appData;

    data.procedures.forEach((p) =>
      p.stages.forEach((s) => {
        s.nextBlock = { name: s.nextBlock?.name ?? '' };
      })
    );

    data.procedures.forEach((p) =>
      p.deciders.forEach((s) => {
        s.positiveBlock = { name: s.positiveBlock?.name ?? '' };
        s.negativeBlock = { name: s.negativeBlock?.name ?? '' };
      })
    );

    return JSON.stringify(data);
  }

  reloadDefaultAppData(appData: IAppData) {
    this.appData = appData;
  }

  getAppData() {
    let appData: IAppData = {
      procedures: [
        {
          name: this.appData.procedures[0].name,
          stages: this.appData.procedures[0].stages,
          deciders: this.appData.procedures[0].deciders,
          magazineCapacity: this.appData.procedures[0].magazineCapacity,
          defaultFailureChance: this.appData.procedures[0].defaultFailureChance,
        },
      ],
      audioFilesPath: this.appData.audioFilesPath,
      emptyAudioFileName: this.appData.emptyAudioFileName,
      maxPlaylistLength: this.appData.maxPlaylistLength,
      defaultAudioExtension: this.appData.defaultAudioExtension,
    };

    return appData;
  }
}

export enum GENERIC_STRINGS {
  YES = 'TAK',
  NO = 'NIE',
}

export const YES_ACTION: IAction = {
  name: GENERIC_STRINGS.YES,
  audioFileName: 'tak.mp3',
};
export const NO_ACTION: IAction = {
  name: GENERIC_STRINGS.NO,
  audioFileName: 'nie.mp3',
};
