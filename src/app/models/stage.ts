import { IAction } from "./action";

export interface IStage {
  name: string;
  actions: IAction[];
  nextStage: IStage;
}
