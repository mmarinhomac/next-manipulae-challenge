import { useEffect, useState } from 'react';
import { Container } from './styles';

export function PlayerError() {
  const [currentTime, setCurrentTime] = useState(3);

  useEffect(() => {
    let count = 3;
    const time = setInterval(() => {
      if (count == 0) {
        clearInterval(time);
      } else {
        setCurrentTime(state => state - 1);
        count -= 1;
      }
    }, 1000);
  }, []);

  return (
    <Container>
      <p>Ops! song not found...</p>
      <p>{currentTime}</p>
    </Container>
  );
}