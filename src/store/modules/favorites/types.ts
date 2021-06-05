import { ITrack } from "../tracks/types";

export enum ActionTypes {
  addTrackToFavorite = 'ADD_TRACK_TO_FAVORITE',
  removeTrackToFavorite = 'REMOVE_TRACK_TO_FAVORITE'
}

export interface IFavoriteTracksState {
  data: ITrack[];
}