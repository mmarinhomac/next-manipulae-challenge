import { all, takeLatest, put } from 'redux-saga/effects';

import { openPlayerSuccess, openPlayerFailure } from './actions';
import { ActionTypes } from './types';

type checkPreviewTrackRequest = ReturnType<typeof openPlayerSuccess>;

function* checkPreviewTrack({ payload }: checkPreviewTrackRequest) {
  const { preview } = payload.track;

  if (preview) {
    yield put(openPlayerSuccess(payload.track));
  } else {
    yield put(openPlayerFailure());
  }
}

export default all([
  takeLatest(ActionTypes.openPlayerRequest, checkPreviewTrack)
]);