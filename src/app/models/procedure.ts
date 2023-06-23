import { IDecider } from './decider';
import { IStage } from './stage';

export interface IProcedure {
  name: string;
  allStages: IStage[];
  allDeciders: IDecider[];
  magazineCapacity: number;
  defaultFailureChance: number;
  isDefault?: boolean;
}
