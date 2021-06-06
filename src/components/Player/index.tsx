import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IState } from '../../store';
import { IPlayerState } from '../../store/modules/player/types';

import { PlayerMobile } from './PlayerMobile';
import { PlayerWeb } from './PlayerWeb';
import { PlayerError } from './PlayerError';

import { Container } from './styles';

export function Player() {
  const player = useSelector<IState, IPlayerState>(state => state.player);

  const [wideVersion, setWideVersion] = useState(false);
  const [isValidateTrack, setIsValidateTrack] = useState(null);

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
    if (player.status === 'opened') {
      setIsValidateTrack(true);
    } else if (player.status === 'preview_failure') {
      setIsValidateTrack(false);
    }
  }, [player]);
  
  return (
    <Container>
      {isValidateTrack === true &&
      (wideVersion ? <PlayerWeb /> : <PlayerMobile />)}
      {isValidateTrack === false && <PlayerError />}
    </Container>
  );
}