export enum ActionTypes {
  addTrackToFavorite = 'ADD_TRACK_TO_FAVORITE',
  removeTrackToFavorite = 'REMOVE_TRACK_TO_FAVORITE'
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

export interface IFavoriteTracksState {
  data: ITrack[];
}