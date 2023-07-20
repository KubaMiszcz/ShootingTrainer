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
import { ORDER_DIRECTION } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  deleteProcedure() {
    const procedures = this.appSettings.appData.procedures;
    const currentProcedure = this.currentProcedure$.value;

    let idx = procedures.findIndex((p) => p === currentProcedure);
    _.remove(procedures, this.currentProcedure$.value);
    idx = idx > procedures.length - 2 ? procedures.length - 1 : idx;
    this.changeProcedure(procedures?.[idx]);
  }
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================

  currentProcedure$ = new BehaviorSubject<IProcedure>(
    this.getDefaultProcedure()
  );
  allProcedures$ = new BehaviorSubject<IProcedure[]>([]);

  constructor(
    private appSettings: AppSettingsService,
    private audioPlayerService: AudioPlayerService
  ) {
    this.allProcedures$.next(appSettings.appData.procedures);
  }

  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================

  getDeciderNameSuffix(block: IBlock) {
    let suffix = '';
    if (!this.isDecider(block)) {
      return suffix;
    }

    if (!block.name.endsWith('?')) {
      suffix += '?';
    }
    suffix += ' (D)';

    return suffix;
  }

  addNewDecider() {
    let procedure = this.currentProcedure$.value;
    let allDecidersNames = procedure.deciders.map((s) => s.name);
    let newUniqueName = this.getNewUniqueName(allDecidersNames, 'Decyzja');
    let newDecider: IDecider = {
      name: newUniqueName,
      audioFileName: '',
      positiveBlockName: '',
      negativeBlockName: '',
      positiveChance: 0.5,
    };
    procedure.deciders = [newDecider, ...procedure.deciders];
    this.currentProcedure$.next(procedure);
  }

  addProcedure() {
    let allProceduresNames = this.allProcedures$.value.map((p) => p.name);
    let newUniqueName = this.getNewUniqueName(allProceduresNames, 'Procedura');

    let newProcedure: IProcedure = {
      name: newUniqueName,
      stages: [],
      deciders: [],
      magazineCapacity: 30,
      defaultFailureChance: 0.5,
    };

    this.appSettings.appData.procedures.push(newProcedure);
    this.changeProcedure(newProcedure);
  }

  reorderAction(stage: IStage, action: IAction, direction: ORDER_DIRECTION) {
    let actions = stage.actions;
    let idx = actions?.findIndex((a) => a === action);
    let maxIdx = actions?.length - 1;

    if (direction === ORDER_DIRECTION.DOWN && idx !== maxIdx) {
      this.swapArrayItems(actions, idx, idx + 1);
    }
    if (direction === ORDER_DIRECTION.UP && idx !== 0) {
      this.swapArrayItems(actions, idx, idx - 1);
    }
  }

  appendNewAction(stage: IStage) {
    let newAction: IAction = {
      name: 'NowaAkcja',
      audioFileName: '',
    };

    stage.actions.push(newAction);
  }

  renameProcedure(procedureName: string) {
    this.currentProcedure$.value.name = procedureName;
  }

  addNewStage() {
    let procedure = this.currentProcedure$.value;
    let allStagesNames = procedure.stages.map((s) => s.name);
    let newUniqueName = this.getNewUniqueName(allStagesNames, 'Krok');
    let newStage: IStage = { name: newUniqueName, actions: [] };
    procedure.stages = [newStage, ...procedure.stages];
    this.currentProcedure$.next(procedure);
  }

  private getNewUniqueName(names: string[], prefix: string) {
    let i = 0;
    let isUnique = false;
    while (!isUnique) {
      i++;
      if (!names.find((s) => s === prefix + i)) {
        isUnique = true;
      }
    }

    return prefix + i;
  }

  getAllBlocks(): IBlock[] {
    let procedure = this.currentProcedure$.value;
    return [...procedure.stages, ...procedure.deciders] ?? [];
  }

  deleteBlock(block: IBlock) {
    let procedure = this.currentProcedure$.value;

    if (this.isStage(block)) {
      _.remove(procedure.stages, block);
    }

    if (this.isDecider(block)) {
      _.remove(procedure.deciders, block);
    }
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
    let block: IStage | IDecider | undefined =
      this.getCurrentProcedure().stages[0];
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

  getCurrentProcedure() {
    return this.currentProcedure$.value;
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

  isDecider(obj: IBlock | IStage | IDecider | undefined): boolean {
    return (obj as IDecider).positiveBlockName !== undefined;
  }

  isStage(obj: IBlock | IStage | IDecider | undefined): boolean {
    return (obj as IStage).actions !== undefined;
  }

  getDeciderResult(block: IDecider) {
    return Math.random() < block.positiveChance;
  }

  getBlockByName(name: string | undefined): IStage | IDecider | undefined {
    let block = this.getStageByName(name) ?? this.getDeciderByName(name);
    return block;
  }

  getStageByName(name: string | undefined): IStage | undefined {
    return this.currentProcedure$.value.stages.find((s) => s.name === name);
  }

  getDeciderByName(name: string | undefined): IDecider | undefined {
    return this.currentProcedure$.value.deciders.find((s) => s.name === name);
  }

  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //====================================================================
  //GENERIC METHODS
  //move to coreservice
  deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

  swapArrayItems<T>(array: T[], index1: number, index2: number) {
    [array[index1], array[index2]] = [array[index2], array[index1]];
  }

  deleteItemFromArrayByIndex<T>(array: T[], idx: number) {
    array.splice(idx, 1);
  }

  getArraySortedByName<T>(array: T[]): T[] {
    return _.orderBy(array, 'name', 'asc');
  }
}
