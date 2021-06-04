import { combineReducers } from "redux";

import favorites from './favorites/reducer';
import player from './player/reducer';

export default combineReducers({
  favorites,
  player
});
