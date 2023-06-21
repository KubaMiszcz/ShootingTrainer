import { Injectable } from '@angular/core';
import { IStage } from '../models/stage';
import { IAction } from '../models/action';
import { IDecider } from '../models/decider';

@Injectable({
  providedIn: 'root',
})

export class AppSettingsService {
  magazineCapacity = 30;
  defaultFailureChance = 0.25;
  defaultProcedure: IStage[] = [];
  audioFilesPath = '../assets/audio/';

  constructor() {}
}

// export const DELAY_1SEC: IAction = {
//     label: 'pauza 1sek',
//     audioFileName: 'pause-1sec.mp3',
// }

// export const DEFAULT_STAGES: any[] = [
//   {
//     name: '111stage',
//     actions: [
//       {
//         name: 'prosto11',
//         audioFileName: 'forward.mp3',
//       },
//       {
//         name: 'prosto12',
//         audioFileName: 'left.mp3',
//       },
//     ],
//   },
//   {
//     name: '222stage',
//     actions: [
//       {
//         name: 'prosto21',
//         audioFileName: 'right.mp3',
//       },
//       {
//         name: 'prosto22',
//         audioFileName: 'forward.mp3',
//       },
//     ],
//   },
// ];

export const ALL_DECIDERS: IDecider[] = [
  {
    name: 'dec1',
    audioFileName: 'where.mp3',
    positiveBlockName: 'step3',
    negativeBlockName: 'step4',
    positiveChance: 0.5,
  },
];

export const ALL_STAGES: IStage[] = [
  {
    name: 'step1',
    actions: [
      {
        name: 'S1wepnij magazynek',
        audioFileName: 'attach-magazine.mp3',
      },
      {
        name: 'S1obroc bron',
        audioFileName: 'turn-rifle.mp3',
        delay_sec: 2,
      },
    ],
    nextBlockName: 'step2',
  },
  {
    name: 'step2',
    actions: [
      {
        name: 'S2patrz na komore',
        audioFileName: 'lookatchamber.mp3',
      },
      {
        name: 'S2zrzuc suwadlo',
        audioFileName: 'release-slider.mp3',
      },
    ],
    nextBlockName: 'dec1',
  },
  {
    name: 'step3',
    actions: [
      {
        name: 'S3patrz na komore',
        audioFileName: 'lookatchamber.mp3',
      },
      {
        name: 'S3zrzuc suwadlo',
        audioFileName: 'release-slider.mp3',
      },
    ],
    nextBlockName: '',
  },
  {
    name: 'step4',
    actions: [
      {
        name: 'S4patrz na komore',
        audioFileName: 'lookatchamber.mp3',
      },
      {
        name: 'S4zrzuc suwadlo',
        audioFileName: 'release-slider.mp3',
      },
    ],
    nextBlockName: '',
  },
];
