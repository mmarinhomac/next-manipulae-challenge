import { Reducer } from "redux";
import produce from 'immer';

import { ActionTypes, IFavoriteTracksState } from "./types";

const INITIAL_STATE: IFavoriteTracksState = {
  data: []
}

const favorites: Reducer<IFavoriteTracksState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addTrackToFavorite: {
        const { track } = action.payload;
        draft.data.push(track);

        break;
      }
      case ActionTypes.removeTrackToFavorite: {
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