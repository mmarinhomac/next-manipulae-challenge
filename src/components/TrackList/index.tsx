import { TrackItem } from './TrackItem';

import { Container } from './styles';

export function TrackList({ data }) {
  return (
    <Container>
      {data.map(track => (
        <TrackItem key={track.id} track={track} />
      ))}
    </Container>
  );
}