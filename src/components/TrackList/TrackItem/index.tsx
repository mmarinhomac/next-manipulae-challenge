
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { addTrackToFavorite } from '../../../store/modules/favorites/actions';
import { removeTrackToFavorite } from '../../../store/modules/favorites/actions';
import { openPlayerRequest } from '../../../store/modules/player/actions';

import { IState } from '../../../store';
import { ITrack } from '../../../store/modules/tracks/types';

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

  const TrackItemBaseRef = useRef(null);
  const ButtonStartPlayerRef = useRef(null);
  const ButtonFavoriteRef  = useRef(null);
  const TrackAuxInfoRef = useRef(null);
  const DivTitlesRef = useRef(null);

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

  function handleMaxWidthAuxInfo() {
    const calc = TrackItemBaseRef.current.offsetWidth - 
      TrackAuxInfoRef.current.offsetWidth - 
      ButtonFavoriteRef.current.offsetWidth - 
      (ButtonStartPlayerRef.current.offsetHeight * 0.7);
    DivTitlesRef.current.style.maxWidth = `calc(${calc}px)`;
  }

  useEffect(() => {
    const flag = favorites.filter(item => item.id === track.id);
    if (flag.length > 0) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [favorites]);

  useEffect(() => {
    handleMaxWidthAuxInfo();
    window.addEventListener('resize', handleMaxWidthAuxInfo);
  }, [
    TrackItemBaseRef.current, 
    ButtonStartPlayerRef.current, 
    ButtonFavoriteRef.current, 
    TrackAuxInfoRef.current, 
    DivTitlesRef.current
  ]);
  
  return (
    <TrackItemBase ref={TrackItemBaseRef}>
        <ButtonStartPlayer 
          type="button" 
          ref={ButtonStartPlayerRef}
          onClick={handlePlayer}
        >
          <img src={track.image_medium} alt="trackImage" />

          <div ref={DivTitlesRef} >
            <TrackInfo>
              <p>{track.title}</p>
              <p>by: {track.artist}</p>
            </TrackInfo>

            <TrackAuxInfo ref={TrackAuxInfoRef}>
              <span>{track.duration}</span>
            </TrackAuxInfo>
          </div>
        </ButtonStartPlayer>
        <ButtonFavorite 
          type="button" 
          ref={ButtonFavoriteRef} 
          isFavorite={!!favorite} 
          onClick={handleFavorite}
        >
          {!favorite && <MdFavoriteBorder />}
          {favorite && <MdFavorite />}
        </ButtonFavorite>
    </TrackItemBase>
  );
}