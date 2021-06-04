import { ITrack } from "./types";

export function addTrackToFavorite(track: ITrack) {
  return {
    type: 'ADD_TRACK_TO_FAVORITE',
    payload: {
      track
    }
  }
}

export function removeTrackToFavorite(track: ITrack) {
  return {
    type: 'REMOVE_TRACK_TO_FAVORITE',
    payload: {
      track
    }
  }
}