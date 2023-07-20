import { IAction } from './action';
import { IBlock } from './block';
import { IDecider } from './decider';

export interface IStage extends IBlock {
  name: string;
  actions: IAction[];
  nextBlock?: IBlock;
}

// export class Stage implements IStage {
//   name = '';
//   actions = [];
//   nextBlockName?: string | undefined;
// }
