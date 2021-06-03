
import { useState } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

import { TrackItemBase, TrackInfo, TrackAuxInfo } from './styles';

export function TrackItem({ track }) {
  const [favorite, setFavorite] = useState(false);

  function handleFavorite() {
    setFavorite(!favorite);
  }
  
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