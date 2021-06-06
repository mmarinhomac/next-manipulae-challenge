import { Reducer } from "redux";
import produce from 'immer';

import { ActionTypes, IPlayerState } from "./types";

const INITIAL_STATE: IPlayerState = {
  track: {
    id: 0,
    title: '',
    artist: '',
    duration: 0,
    image_medium: '',
    image_big: '',
    preview: '',
    link: ''
  },
  status: 'closed'
}

const player: Reducer<IPlayerState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.openPlayerSuccess: {
        const { track } = action.payload;
        draft.status = 'closed';
        draft.track = track;
        draft.status = 'opened';

        break;
      }
      case ActionTypes.openPlayerFailure: {
        draft.status = 'preview_failure';

        break;
      }
      case ActionTypes.closePlayer: {
        draft.status = 'closed';

        break;
      }
      default: {
        return state;
      }
    }
  });
}

export default player;