import { Reducer } from "redux";
import produce from 'immer';

import { IFavoriteTracksState } from "./types";

const INITIAL_STATE: IFavoriteTracksState = {
  data: []
}

const favorites: Reducer<IFavoriteTracksState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TRACK_TO_FAVORITE': {
        const { track } = action.payload;
        draft.data.push(track);

        break;
      }
      case 'REMOVE_TRACK_TO_FAVORITE': {
        const { track } = action.payload;
        const index = draft.data.findIndex(item => item.id === track.id);
        if (index !== -1) draft.data.splice(index, 1);
        
        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default favorites;