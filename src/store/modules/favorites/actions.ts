import { ActionTypes, ITrack } from "./types";

export function addTrackToFavorite(track: ITrack) {
  return {
    type: ActionTypes.addTrackToFavorite,
    payload: {
      track
    }
  }
}

export function removeTrackToFavorite(track: ITrack) {
  return {
    type: ActionTypes.removeTrackToFavorite,
    payload: {
      track
    }
  }
}