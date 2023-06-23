import { IDecider } from './decider';
import { IStage } from './stage';

export interface IProcedure {
  name: string;
  stages: IStage[];
  deciders: IDecider[];
  magazineCapacity: number;
  defaultFailureChance: number;
  isDefault?: boolean;
}
