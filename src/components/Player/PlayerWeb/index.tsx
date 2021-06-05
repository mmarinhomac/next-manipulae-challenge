import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoMdSkipBackward, IoMdSkipForward, IoMdPlay, IoMdPause } from 'react-icons/io';

import { IState } from '../../../store';
import { ITrack } from '../../../store/modules/tracks/types';
import { IPlayerState } from '../../../store/modules/player/types';

import { 
  Container, 
  Flex,
  BigImage,
  LinkDeezer,
  Footer, 
  StackActions,
  ButtonGoBackTrack,
  ButtonPlayTrack,
  ButtonGoNextTrack,
  ButtonMinimizeMaximize,
  HStackTimeTrack,
  HStackInfo,
  BoxImage,
  VStack
} from './styles';

export function PlayerWeb() {
  const player = useSelector<IState, IPlayerState>(state => state.player);
  const tracks = useSelector<IState, ITrack[]>(state => state.tracks.data);

  const audioRef = useRef(new Audio());
  // Development
  audioRef.current.muted = true;

  const [currentTrack, setCurrentTrack] = useState(player.track);
  const [playTrack, setPlayTrack] = useState(true);
  const [enabledChangeTrack, setEnabledChangeTrack] = useState('normal');
  const [maximizeView, setMaximizeView] = useState(false);
  const [oldEventInstance, setOldEventInstance] = useState(null);

  function handlePreviousTrack() {
    const index = tracks.indexOf(currentTrack) - 1;
    const previous = tracks[index];
    if (previous) {
      audioRef.current.src = '';
      audioRef.current.currentTime = 0;
      audioRef.current.src = previous.preview;
      audioRef.current.play();
      setCurrentTrack(tracks[index]);
    }
  }

  function handlePlayPause() {
    if (playTrack) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlayTrack(!playTrack);
  }

  function handleNextTrack() {
    const index = tracks.indexOf(currentTrack) + 1;
    const next = tracks[index];
    if (next) {
      audioRef.current.src = '';
      audioRef.current.currentTime = 0;
      audioRef.current.src = next.preview;
      audioRef.current.play();
      setCurrentTrack(tracks[index]);
    } else if (audioRef.current.paused) {
      setPlayTrack(false);
    }
  }

  useEffect(() => {
    audioRef.current.src = '';
    audioRef.current.currentTime = 0;
    audioRef.current.src = player.track.preview;
    audioRef.current.play();
    setCurrentTrack(player.track);
    setPlayTrack(true);
  }, [player]);

  useEffect(() => {
    if (oldEventInstance) audioRef.current.removeEventListener('ended', oldEventInstance);
    audioRef.current.addEventListener('ended', handleNextTrack);
    setOldEventInstance(() => handleNextTrack);

    return () => {
      audioRef.current.removeEventListener('ended', oldEventInstance);
    }
  }, [currentTrack]);

  useEffect(() => {
    const indexPrevious = tracks.indexOf(currentTrack) - 1;
    const previous = tracks[indexPrevious];
    const indexNext = tracks.indexOf(currentTrack) + 1;
    const next = tracks[indexNext];

    if (!previous) {
      setEnabledChangeTrack('block_previous');
    } else if (!next) {
      setEnabledChangeTrack('block_next');
    } else {
      setEnabledChangeTrack('normal');
    }
  }, [currentTrack]);

  return (
    <Container>
      <Flex maximizeView={maximizeView}>
        <BigImage src={currentTrack.image_big} />

        <LinkDeezer>
          Complete Music
        </LinkDeezer>
      </Flex>

      <Footer>
        <StackActions>
          <ButtonGoBackTrack 
            type="button" 
            onClick={handlePreviousTrack}
            enabledChangeTrack={enabledChangeTrack}
          >
            <IoMdSkipBackward />
          </ButtonGoBackTrack>
          <ButtonPlayTrack 
            type="button" 
            onClick={handlePlayPause}
          >
            {!playTrack && <IoMdPlay />}
            {playTrack && <IoMdPause />}
          </ButtonPlayTrack>
          <ButtonGoNextTrack 
            type="button" 
            onClick={handleNextTrack}
            enabledChangeTrack={enabledChangeTrack}
          >
            <IoMdSkipForward />
          </ButtonGoNextTrack>
        </StackActions>

        <ButtonMinimizeMaximize 
          type="button" 
          onClick={() => setMaximizeView(!maximizeView)}
          maximizeView={maximizeView}
        >
          <HStackTimeTrack>
            <p>1:25</p>
            <p>{` / ${currentTrack.duration}`}</p>
          </HStackTimeTrack>

          <HStackInfo>
            <BoxImage src={currentTrack.image_medium} />
            <VStack>
              <p>{currentTrack.title}</p>
              <p>{currentTrack.artist}</p>
            </VStack>
          </HStackInfo>

          <MdKeyboardArrowUp />
        </ButtonMinimizeMaximize>
      </Footer>
    </Container>
  )
}