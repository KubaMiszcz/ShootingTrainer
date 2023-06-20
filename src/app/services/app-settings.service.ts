import { Injectable } from '@angular/core';
import { IStage } from '../models/stage';

@Injectable({
  providedIn: 'root',
})

export class AppSettingsService {
  MagazineCapacity = 30;
  failureChance = 0.25;
  defaultProcedure = DEFAULTPROCEDURE
  audioPath = '../assets/audio/';


}

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
