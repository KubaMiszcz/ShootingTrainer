import { IProcedure } from "./procedure";
import { IStage } from "./stage";


export interface IAppData {
  procedures: IProcedure[];
  audioFilesPath: string;
  emptyAudioFileName: string;
  maxPlaylistLength: number;
  defaultAudioExtension: string;
}




