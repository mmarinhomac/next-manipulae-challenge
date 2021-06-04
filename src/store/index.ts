import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { IFavoriteTracksState } from './modules/favorites/types';
import { IPlayerState } from './modules/player/types';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface IState {
  favorites: IFavoriteTracksState,
  player: IPlayerState
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
);

sagaMiddleware.run(rootSaga);

export default store;