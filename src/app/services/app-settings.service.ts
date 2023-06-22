import { Injectable } from '@angular/core';
import { IStage } from '../models/stage';
import { IAction } from '../models/action';
import { IDecider } from '../models/decider';
import { IAppData } from '../models/appData';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  allStages: IStage[] = [];
  allDeciders: IDecider[] = [];
  magazineCapacity: number;
  defaultFailureChance: number;
  audioFilesPath: string;
  maxPlaylistLength: number;
  appData: IAppData;

  constructor() {
    this.appData = APP_DATA_JSON;
    this.allStages = this.appData.procedures[0].allStages;
    this.allDeciders = this.appData.procedures[0].allDeciders;
    this.magazineCapacity=this.appData.procedures[0].magazineCapacity ??30;
    this.defaultFailureChance=this.appData.procedures[0].defaultFailureChance??30;
    this.audioFilesPath=this.appData.audioFilesPath??'';
    this.maxPlaylistLength = this.appData.maxPlaylistLength??30;
  }

  reloadDefaultAppData(appData: IAppData) {
    this.appData = appData;
  }

  getAppData() {
    let appData: IAppData = {
      procedures: [
        {
          allStages: this.appData.procedures[0].allStages,
          allDeciders: this.appData.procedures[0].allDeciders,
          magazineCapacity: 30,
          defaultFailureChance: 0.25,
        },
      ],
      audioFilesPath: '../assets/audio/',
      maxPlaylistLength: 20,
    };

  return appData;
  }
}

export const ALL_DECIDERS: IDecider[] = [
  {
    name: 'dec1',
    audioFileName: 'przeladuj.mp3',
    positiveBlockName: 'step3',
    negativeBlockName: 'step4',
    positiveChance: 0.5,
  },
];

export const ALL_STAGES: IStage[] = [
  {
    name: 'start',
    actions: [],
    nextBlockName: 'step1',
  },
  {
    name: 'step1',
    actions: [
      {
        name: 'S1wepnij magazynek',
        audioFileName: 'wepnijMagazynek.mp3',
      },
      {
        name: 'S1obroc bron',
        audioFileName: 'obrocBron.mp3',
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
        audioFileName: 'patrzNaKomore.mp3',
      },
      {
        name: 'S2zrzuc suwadlo',
        audioFileName: 'zrzucSuwadlo.mp3',
      },
    ],
    nextBlockName: 'dec1',
  },
  {
    name: 'step3',
    actions: [
      {
        name: 'S3patrz na komore',
        audioFileName: 'patrzNaKomore.mp3',
      },
      {
        name: 'S3zrzuc suwadlo',
        audioFileName: 'zrzucSuwadlo.mp3',
      },
    ],
    nextBlockName: '',
  },
  {
    name: 'step4',
    actions: [
      {
        name: 'S4patrz na komore',
        audioFileName: 'patrzNaKomore.mp3',
      },
      {
        name: 'S4zrzuc suwadlo',
        audioFileName: 'zrzucSuwadlo.mp3',
      },
    ],
    nextBlockName: '',
  },
];

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

export const APP_DATA_JSON: IAppData = {
  procedures: [
    {
      allStages: [
        { name: 'start', actions: [], nextBlockName: 'step1' },
        {
          name: 'step1',
          actions: [
            {
              name: 'S1podepnij magazynek',
              audioFileName: 'podepnij magazynek.mp3',
            },
            {
              name: 'S1obroc bron',
              audioFileName: 'obrocBron.mp3',
              delay_sec: 2,
            },
          ],
          nextBlockName: 'step2',
        },
        {
          name: 'step2',
          actions: [
            { name: 'S2patrz na komore', audioFileName: 'patrzNaKomore.mp3' },
            { name: 'S2zrzuc suwadlo', audioFileName: 'zrzucSuwadlo.mp3' },
          ],
          nextBlockName: 'dec1',
        },
        {
          name: 'step3',
          actions: [
            { name: 'S3patrz na komore', audioFileName: 'patrzNaKomore.mp3' },
            { name: 'S3zrzuc suwadlo', audioFileName: 'zrzucSuwadlo.mp3' },
          ],
          nextBlockName: '',
        },
        {
          name: 'step4',
          actions: [
            { name: 'S4patrz na komore', audioFileName: 'patrzNaKomore.mp3' },
            { name: 'S4zrzuc suwadlo', audioFileName: 'zrzucSuwadlo.mp3' },
          ],
          nextBlockName: '',
        },
      ],
      allDeciders: [
        {
          name: 'dec1',
          audioFileName: 'przeladuj.mp3',
          positiveBlockName: 'step3',
          negativeBlockName: 'step4',
          positiveChance: 0.5,
        },
      ],
      magazineCapacity: 30,
      defaultFailureChance: 0.25,
    },
  ],
  audioFilesPath: '../assets/audio/',
  maxPlaylistLength: 20,
};
