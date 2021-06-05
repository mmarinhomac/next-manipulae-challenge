import { ITrack } from "../tracks/types";

export enum ActionTypes {
  openPlayerRequest = 'OPEN_PLAYER_REQUEST',
  openPlayerSuccess = 'OPEN_PLAYER_SUCCESS',
  openPlayerFailure = 'OPEN_PLAYER_FAILURE'
}

export interface IPlayerState {
  track: ITrack;
  status: 'opened' | 'closed' | 'preview_failure';
}