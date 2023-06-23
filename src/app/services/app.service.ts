import { AudioPlayerService } from 'src/app/services/audio-player.service';
import { Injectable } from '@angular/core';
import {
  AppSettingsService,
  NO_ACTION,
  YES_ACTION,
} from './app-settings.service';
import { IStage } from '../models/stage';
import { IDecider } from '../models/decider';
import { IAction } from '../models/action';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProcedure } from '../models/procedure';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  currentProcedure$ = new BehaviorSubject<IProcedure>(
    this.getDefaultProcedure()
  );

  constructor(
    private appSettings: AppSettingsService,
    private audioPlayerService: AudioPlayerService
  ) {
  }

  changeProcedure(value: IProcedure) {
    this.appSettings.appData.procedures.forEach((p) => (p.isDefault = false));
    value.isDefault = true;
    this.currentProcedure$.next(value);
  }

  getDefaultProcedure(): IProcedure {
    let procedures = this.appSettings.appData.procedures;
    return procedures.find((p) => p.isDefault) ?? _.first(procedures)!;
  }

  playProcedure() {
    let playlist = this.createPlaylist(this.appSettings.maxPlaylistLength);
    this.audioPlayerService.playlist = playlist;
    this.audioPlayerService.playPlaylist();
  }

  pauseProcedure() {
    this.audioPlayerService.pausePlaylist();
  }

  stopProcedure() {
    this.audioPlayerService.stopPlaylist();
  }

  createPlaylist(maxLength: number): IAction[] {
    let playlist = [];
    let block = this.getBlockByName('start');
    let deadEnd = false;
    let nextBlockName = '';

    do {
      if (this.isStage(block)) {
        block = block as IStage;
        playlist.push(...block?.actions);
        nextBlockName = this.getNextBlockName(block);
      }

      let result = true;
      if (this.isDecider(block)) {
        block = block as IDecider;
        result = this.getDeciderResult(block);
        let actions: IAction[] = [
          {
            name: block.name,
            audioFileName: block.audioFileName,
            delay_sec: block.delay_ms,
          },
          result ? YES_ACTION : NO_ACTION,
        ];
        playlist.push(...actions);
        nextBlockName = this.getNextBlockName(block, result);
      }

      deadEnd = !nextBlockName.length;
      if (!deadEnd) {
        block = this.getBlockByName(nextBlockName);
      }
    } while (playlist.length < maxLength && !deadEnd);

    return playlist;
  }

  getNextBlockName(block: IStage | IDecider | undefined, result?: boolean) {
    let nextBlockName = '';

    if (this.isStage(block)) {
      nextBlockName = (block as IStage).nextBlockName ?? '';
    }
    if (this.isDecider(block)) {
      block = block as IDecider;
      nextBlockName = !!result
        ? block.positiveBlockName
        : block.negativeBlockName;
    }

    return nextBlockName;
  }

  isDecider(obj: IStage | IDecider | undefined): boolean {
    return (obj as IDecider).positiveBlockName !== undefined;
  }

  isStage(obj: IStage | IDecider | undefined): boolean {
    return (obj as IStage).actions !== undefined;
  }

  getDeciderResult(block: IDecider) {
    return Math.random() < block.positiveChance;
  }

  getBlockByName(name: string | undefined): IStage | IDecider | undefined {
    let block = this.getStageByName(name) ?? this.getetDeciderByName(name);
    return block;
  }

  getStageByName(name: string | undefined): IStage | undefined {
    return this.currentProcedure$.value.allStages.find((s) => s.name === name);
  }

  getetDeciderByName(name: string | undefined): IDecider | undefined {
    return this.currentProcedure$.value.allDeciders.find((s) => s.name === name);
  }

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
