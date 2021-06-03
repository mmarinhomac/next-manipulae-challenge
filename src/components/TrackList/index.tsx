import { MdFavoriteBorder } from 'react-icons/md';

import { Container, TrackItem, TrackInfo, TrackAuxInfo } from './styles';

export function TrackList({ data }) {
  return (
    <Container>
      {data.map(track => (
        <TrackItem key={track.id}>
          <img src={track.image} alt="trackImage" />

          <div>
            <TrackInfo>
              <p>{track.title}</p>
              <p>by: {track.artist}</p>
            </TrackInfo>

            <TrackAuxInfo>
              <span>{track.duration}</span>

              <button>
                <MdFavoriteBorder />
              </button>
            </TrackAuxInfo>
          </div>
      </TrackItem>
      ))}
    </Container>
  );
}