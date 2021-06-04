import { all } from 'redux-saga/effects';

import player from './player/sagas';

export default function* rootSaga() {
  return yield all([
    player
  ])
};
