import { ITrack } from "../tracks/types";
import { ActionTypes } from "./types";

export function openPlayerRequest(track: ITrack) {
  return {
    type: ActionTypes.openPlayerRequest,
    payload: {
      track
    }
  }
}

export function openPlayerSuccess(track: ITrack) {
  return {
    type: ActionTypes.openPlayerSuccess,
    payload: {
      track
    }
  }
}

export function openPlayerFailure() {
  return {
    type: ActionTypes.openPlayerFailure,
  }
}

export function closePlayer() {
  return {
    type: ActionTypes.closePlayer,
  }
}
