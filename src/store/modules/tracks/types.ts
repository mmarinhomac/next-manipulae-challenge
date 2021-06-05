export enum ActionTypes {
  addTracksToPlaylist = 'ADD_TRACKS_TO_PLAYLIST'
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

export interface ITracksState {
  data: ITrack[];
}