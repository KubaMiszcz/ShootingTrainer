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
