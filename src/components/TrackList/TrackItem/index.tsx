
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { addTrackToFavorite } from '../../../store/modules/favoriteTracks/actions';
import { removeTrackToFavorite } from '../../../store/modules/favoriteTracks/actions';

import { IState } from '../../../store';
import { ITrack } from '../../../store/modules/favoriteTracks/types';

import { TrackItemBase, TrackInfo, TrackAuxInfo } from './styles';

export function TrackItem({ track }) {
  const favoriteTracks = useSelector<IState, ITrack[]>(state => state.favoriteTracks.data);
  const dispatch = useDispatch();

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = useCallback(() => {
    if (!favorite) {
      dispatch(addTrackToFavorite(track));
    } else {
      dispatch(removeTrackToFavorite(track));
    }
  }, [favorite, dispatch]);

  useEffect(() => {
    const flag = favoriteTracks.filter(item => item.id === track.id);
    if (flag.length > 0) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favoriteTracks]);
  
  return (
    <TrackItemBase>
        <img src={track.image} alt="trackImage" />

        <div>
          <TrackInfo>
            <p>{track.title}</p>
            <p>by: {track.artist}</p>
          </TrackInfo>

          <TrackAuxInfo isFavorite={!!favorite}>
            <span>{track.duration}</span>

            <button type="button" onClick={handleFavorite}>
              {!favorite && <MdFavoriteBorder />}
              {favorite && <MdFavorite />}
            </button>
          </TrackAuxInfo>
        </div>
    </TrackItemBase>
  );
}