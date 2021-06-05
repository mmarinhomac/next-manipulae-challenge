import { Reducer } from "redux";
import produce from 'immer';

import { ActionTypes, ITracksState } from "./types";

const INITIAL_STATE: ITracksState = {
  data: []
}

const tracks: Reducer<ITracksState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addTracksToPlaylist: {
        const { tracks } = action.payload;
        draft.data = tracks;

        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default tracks;