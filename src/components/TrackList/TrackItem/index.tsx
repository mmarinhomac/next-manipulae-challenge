
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { addTrackToFavorite } from '../../../store/modules/favorites/actions';
import { removeTrackToFavorite } from '../../../store/modules/favorites/actions';
import { openPlayerRequest } from '../../../store/modules/player/actions';

import { IState } from '../../../store';
import { ITrack } from '../../../store/modules/favorites/types';

interface TrackItemProps {
  track: ITrack;
}

import { 
  TrackItemBase, 
  ButtonStartPlayer, 
  TrackInfo, 
  TrackAuxInfo,
  ButtonFavorite
} from './styles';

export function TrackItem({ track }: TrackItemProps) {
  const dispatch = useDispatch();
  
  const favorites = useSelector<IState, ITrack[]>(state => state.favorites.data);

  const [favorite, setFavorite] = useState(false);

  const handleFavorite = useCallback(() => {
    if (!favorite) {
      dispatch(addTrackToFavorite(track));
    } else {
      dispatch(removeTrackToFavorite(track));
    }
  }, [favorite, dispatch]);

  const handlePlayer = useCallback(() => {
    dispatch(openPlayerRequest(track));
  }, [dispatch]);

  useEffect(() => {
    const flag = favorites.filter(item => item.id === track.id);
    if (flag.length > 0) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favorites]);
  
  return (
    <TrackItemBase>
        <ButtonStartPlayer type="button" onClick={handlePlayer}>
          <img src={track.image_medium} alt="trackImage" />

          <div>
            <TrackInfo>
              <p>{track.title}</p>
              <p>by: {track.artist}</p>
            </TrackInfo>

            <TrackAuxInfo>
              <span>{track.duration}</span>
            </TrackAuxInfo>
          </div>
        </ButtonStartPlayer>
        <ButtonFavorite type="button" isFavorite={!!favorite} onClick={handleFavorite}>
          {!favorite && <MdFavoriteBorder />}
          {favorite && <MdFavorite />}
        </ButtonFavorite>
    </TrackItemBase>
  );
}