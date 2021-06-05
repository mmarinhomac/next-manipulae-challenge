import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from 'react-icons/md';
import { IoMdSkipBackward, IoMdSkipForward, IoMdPlay, IoMdPause } from 'react-icons/io';

import { IState } from '../../../store';
import { ITrack } from '../../../store/modules/tracks/types';
import { IPlayerState } from '../../../store/modules/player/types';

interface OldEventsInstancesProps {
  eventType: string;
  functionRef: () => void;
}

import { 
  Container, 
  Flex,
  BigImage,
  VStackInfoMaximized,
  Footer,
  ProgressBarTrack,
  StackActions,
  ButtonGoBackTrack,
  ButtonPlayTrack,
  ButtonGoNextTrack,
  ButtonMinimizeMaximize,
  HStackTimeTrack,
  HStackInfo,
  BoxImage,
  VStackInfoMinimized
} from './styles';

export function PlayerWeb() {
  const player = useSelector<IState, IPlayerState>(state => state.player);
  const tracks = useSelector<IState, ITrack[]>(state => state.tracks.data);

  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(player.track);
  const [playTrack, setPlayTrack] = useState(true);
  const [enabledChangeTrack, setEnabledChangeTrack] = useState('normal');
  const [maximizeView, setMaximizeView] = useState(false);
  const [oldEventsInstances, setOldEventsInstances] = useState<OldEventsInstancesProps[]>([]);
  const [currentTimeTrack, setCurrentTimeTrack] = useState(null);
  const [progressBar, setProgressBar] = useState(0);

  function handlePreviousTrack() {
    const index = tracks.indexOf(currentTrack) - 1;
    const previous = tracks[index];
    if (previous) {
      audioRef.current.src = previous.preview;
      audioRef.current.play();
      setCurrentTrack(tracks[index]);
      setPlayTrack(true);
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
      audioRef.current.src = next.preview;
      audioRef.current.play();
      setCurrentTrack(tracks[index]);
      setPlayTrack(true);
    } else if (audioRef.current.paused) {
      setPlayTrack(false);
    }
  }

  function handleCurrentTimeTrack() {
    if (audioRef.current) {
      const time = moment().minutes(0)
        .seconds(Math.floor(audioRef.current.currentTime))
        .format('mm:ss');
      const progress = (Math.floor(audioRef.current.currentTime) / 30) * 100;
      setCurrentTimeTrack(time);
      setProgressBar(progress);
    }
  }

  // Development
  useEffect(() => {
    audioRef.current.muted = true;
  }, [audioRef]);

  useEffect(() => {
    audioRef.current.src = player.track.preview;
    audioRef.current.play();
    setCurrentTrack(player.track);
    setPlayTrack(true);
  }, [player]);

  useEffect(() => {
    if (oldEventsInstances.length > 0) {
      for (let i of oldEventsInstances) {
        audioRef.current.removeEventListener(i.eventType, i.functionRef);
      }
    };

    audioRef.current.addEventListener('ended', handleNextTrack);
    audioRef.current.addEventListener('timeupdate', handleCurrentTimeTrack);

    setOldEventsInstances([
      {
        eventType: 'ended',
        functionRef: handleNextTrack
      },
      {
        eventType: 'timeupdate',
        functionRef: handleCurrentTimeTrack
      }
    ]);
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
      <audio ref={audioRef} preload="auto"></audio>
      <Flex maximizeView={maximizeView}>
        <BigImage src={currentTrack.image_big} />

        <VStackInfoMaximized>
          <p>{currentTrack.title}</p>
          <p>{currentTrack.artist}</p>
          <a href={currentTrack.link} target="_blank">
            Access the full song
            <MdKeyboardArrowRight />
          </a>
        </VStackInfoMaximized>
      </Flex>

      <Footer>
        <ProgressBarTrack progress={progressBar}>
          <div />
        </ProgressBarTrack>

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
            <p>{currentTimeTrack || '00:00'}</p>
            <p>/</p>
            <p>0:30</p>
          </HStackTimeTrack>

          <HStackInfo>
            <BoxImage src={currentTrack.image_medium} />
            <VStackInfoMinimized>
              <p>{currentTrack.title}</p>
              <p>{currentTrack.artist}</p>
            </VStackInfoMinimized>
          </HStackInfo>

          <MdKeyboardArrowUp />
        </ButtonMinimizeMaximize>
      </Footer>
    </Container>
  )
}