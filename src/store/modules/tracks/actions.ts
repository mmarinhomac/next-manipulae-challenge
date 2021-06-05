import { ActionTypes, ITrack } from "./types";

export function addTracksToPlaylist(tracks: ITrack[]) {
  return {
    type: ActionTypes.addTracksToPlaylist,
    payload: {
      tracks
    }
  }
}
