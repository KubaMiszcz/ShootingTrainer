export interface IAction {
  name: string;
  description?: string;
  audioFileName: string;
  isDisabled?: boolean;
  delay_sec?: number;
}

