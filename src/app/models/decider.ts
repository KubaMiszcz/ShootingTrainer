import { IAction } from "./action";
import { IStage } from "./stage";

export interface IDecider {
  label: string;
  audioFilepath: string;
  positiveOutput: IStage;
  negativeOutput: IStage;
  delay_ms: number;
}
