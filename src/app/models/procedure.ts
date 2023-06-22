import { IDecider } from './decider';
import { IStage } from './stage';

export interface IProcedure {
  allStages: IStage[];
  allDeciders: IDecider[];
  magazineCapacity: number;
  defaultFailureChance: number;
}
