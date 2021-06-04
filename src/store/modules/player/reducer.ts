import { Reducer } from "redux";
import produce from 'immer';

import { ActionTypes, IPlayerState } from "./types";

const INITIAL_STATE: IPlayerState = {
  track: {
    id: 0,
    title: '',
    artist: '',
    duration: 0,
    image: '',
    preview: ''
  },
  status: 'closed'
}

const player: Reducer<IPlayerState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.openPlayerSuccess: {
        const { track } = action.payload;
        draft.track = track;
        draft.status = 'opened';

        break;
      }
      case ActionTypes.openPlayerFailure: {
        draft.status = 'preview_failure';

        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default player;