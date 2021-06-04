export enum ActionTypes {
  openPlayerRequest = 'OPEN_PLAYER_REQUEST',
  openPlayerSuccess = 'OPEN_PLAYER_SUCCESS',
  openPlayerFailure = 'OPEN_PLAYER_FAILURE'
}

export interface ITrack {
  id: number;
  title: string;
  artist: string;
  duration: number;
  image_medium: string;
  image_big: string;
  preview: string;
}

export interface IPlayerState {
  track: ITrack;
  status: 'opened' | 'closed' | 'preview_failure';
}