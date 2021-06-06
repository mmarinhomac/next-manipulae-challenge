import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from 'axios';

import { openPlayerSuccess, openPlayerFailure } from './actions';
import { ActionTypes } from './types';

type checkPreviewTrackRequest = ReturnType<typeof openPlayerSuccess>;

function* checkPreviewTrack({ payload }: checkPreviewTrackRequest) {
  const { preview } = payload.track;

  try {
    yield call(api.get, preview);
    yield put(openPlayerSuccess(payload.track));
  } catch {
    yield put(openPlayerFailure());
  }
}

export default all([
  takeLatest(ActionTypes.openPlayerRequest, checkPreviewTrack)
]);