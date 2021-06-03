import { createStore } from 'redux';

import { IFavoriteTracksState } from './modules/favoriteTracks/types';

import rootReducer from './modules/rootReducer';

export interface IState {
  favoriteTracks: IFavoriteTracksState
}

const store = createStore(rootReducer);

export default store;