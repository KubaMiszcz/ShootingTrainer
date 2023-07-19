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
import { IBlock } from '../models/block';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  //===============================
  //===============================
  //===============================
  //===============================

  currentProcedure$ = new BehaviorSubject<IProcedure>(
    this.getDefaultProcedure()
  );

  constructor(
    private appSettings: AppSettingsService,
    private audioPlayerService: AudioPlayerService
  ) {}

  renameProcedure(procedureName: string) {
    this.currentProcedure$.value.name = procedureName;
  }

  addNewStage() {
    let procedure = this.currentProcedure$.value;
    let newUniqueName = this.getNewUniqueName(procedure.stages, 'NowyKrok');
    let newStage: IStage = { name: newUniqueName, actions: [] };
    procedure.stages = [newStage, ...procedure.stages];
    this.currentProcedure$.next(procedure);
  }

 private getNewUniqueName(stages: IStage[], prefix: string) {
    let i = 0;
    let isUnique = false;
    while (!isUnique) {
      i++;
      if (!stages.find((s) => s.name === prefix + i)) {
        isUnique = true;
      }
    }

    return prefix + i;
  }

  deleteActionFromStage(stage: IStage, action: IAction) {
    _.remove(stage.actions, action);
  }

  getAllBlocks(): IBlock[] {
    let procedure = this.currentProcedure$.value;
    return [...procedure.stages, ...procedure.deciders] ?? [];
  }

  deleteBlock(name: string) {
    let procedure = this.currentProcedure$.value;
    let block: IStage | IDecider | undefined = procedure.stages.find(
      (s) => s.name === name
    );

    if (!block) {
      block = procedure.deciders.find((s) => s.name === name);
    }

    _.remove(procedure.stages, block);
    return;
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
    if (!this.audioPlayerService.playlist?.length) {
      let playlist = this.createPlaylist(this.appSettings.maxPlaylistLength);
      this.audioPlayerService.playlist = playlist;
    }
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
        let activeActions = block?.actions.filter((a) => !a.isDisabled);
        playlist.push(...activeActions);
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
            delay_sec: block.delay_sec,
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
    return this.currentProcedure$.value.stages.find((s) => s.name === name);
  }

  getetDeciderByName(name: string | undefined): IDecider | undefined {
    return this.currentProcedure$.value.deciders.find((s) => s.name === name);
  }

  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}

