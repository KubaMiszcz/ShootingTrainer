import { IAction } from './action';
import { IDecider } from './decider';

export interface IStage {
  name: string;
  actions: IAction[];
  nextBlockName?: string;
}
