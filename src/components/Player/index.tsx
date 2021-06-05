import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../store';
import { IPlayerState } from '../../store/modules/player/types';

import { PlayerMobile } from './PlayerMobile';
import { PlayerWeb } from './PlayerWeb';

import { Container } from './styles';

export function Player() {
  const player = useSelector<IState, IPlayerState>(state => state.player);

  const [wideVersion, setWideVersion] = useState(false);

  function handleBreakpoints() {
    const isWideVersion = window.innerWidth > 768;

    if (isWideVersion) {
      setWideVersion(true);
    } else {
      setWideVersion(false);
    }
  }

  useEffect(() => {
    handleBreakpoints();

    window.addEventListener('resize', () => {
      handleBreakpoints();
    });
  }, []);

  useEffect(() => {
    console.log(player.status);
  }, [player]);
  
  return (
    <Container>
      {!wideVersion && <PlayerMobile />}
      {wideVersion && <PlayerWeb />}
    </Container>
  );
}