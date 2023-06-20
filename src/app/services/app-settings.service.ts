import { Injectable } from '@angular/core';
import { IStage } from '../models/stage';
import { IAction } from '../models/action';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  MagazineCapacity = 30;
  failureChance = 0.25;
  defaultProcedure = DEFAULTPROCEDURE;
  // delay_1sec = DELAY_1SEC;
  audioPath = '../assets/audio/';
}

// export const DELAY_1SEC: IAction = {
//     label: 'pauza 1sek',
//     audioFileName: 'pause-1sec.mp3',
// }


export const DEFAULTPROCEDURE: IStage[] = [
  {
    name: 'start',
    actions: [
      {
        label: 'wepnij magazynek',
        audioFileName: 'attach-magazine.mp3',
      },
      {
        label: 'obroc bron',
        audioFileName: 'turn-rifle.mp3',
        delay_sec: 2,
      },
      {
        label: 'patrz na komore',
        audioFileName: 'lookatchamber.mp3',
      },
      {
        label: 'zrzuc suwadlo',
        audioFileName: 'release-slider.mp3',
      },
    ],
  },
];
