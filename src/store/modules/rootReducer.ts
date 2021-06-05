import { combineReducers } from "redux";

import favorites from './favorites/reducer';
import player from './player/reducer';
import tracks from './tracks/reducer';

export default combineReducers({
  favorites,
  player,
  tracks
});
