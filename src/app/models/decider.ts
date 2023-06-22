import { IAction } from './action';
import { IStage } from './stage';

export interface IDecider {
  name: string;
  audioFileName: string;
  positiveBlockName: string;
  negativeBlockName: string;
  positiveChance: number;
  delay_ms?: number;
}

export class Decider implements IDecider {
  name = '';
  audioFileName = '';
  positiveBlockName = '';
  negativeBlockName = '';
  positiveChance = 0.5;
  delay_ms?: number | undefined;
}
