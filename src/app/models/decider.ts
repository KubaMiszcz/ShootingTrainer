import { IAction } from './action';
import { IBlock } from './block';
import { IStage } from './stage';

export interface IDecider extends IBlock {
  name: string;
  description?: string;
  audioFileName: string;
  // positiveBlockName?: string;
  positiveBlock?: IBlock;
  // negativeBlockName?: string;
  negativeBlock?: IBlock;
  positiveChance: number;
  delay_sec?: number;
}

// export class Decider implements IDecider {
//   name = '';
//   audioFileName = '';
//   positiveBlockName = '';
//   negativeBlockName = '';
//   positiveChance = 0.5;
//   delay_ms?: number | undefined;
// }
