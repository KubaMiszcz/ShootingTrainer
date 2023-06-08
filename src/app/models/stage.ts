import { IAction } from "./action";

export interface IStage {
  name: string;
  items: any;
  actions: IAction[];
}
