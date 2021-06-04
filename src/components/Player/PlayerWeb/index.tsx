import { useEffect, useState } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { IoMdSkipBackward, IoMdSkipForward, IoMdPlay, IoMdPause } from 'react-icons/io';

import { ITrack } from '../../../store/modules/favorites/types';

interface PlayerWebProps {
  track: ITrack;
}

import { 
  Container, 
  Flex, 
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

export function PlayerWeb({ track }: PlayerWebProps) {
  const [audio, setAudio] = useState(null);
  const [playTrack, setPlayTrack] = useState(true);

  function handlePlayPause() {
    if (playTrack) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlayTrack(!playTrack);
  }

  function handleNextTrack() {
    console.log(track.next_track);
  }

  useEffect(() => {
    const preview = new Audio(track.preview);
    setAudio(preview);
    preview.play();
  }, []);

  return (
    <Container>
      <Flex />

      <Footer>
        <StackActions>
          <ButtonGoBackTrack type="button">
            <IoMdSkipBackward />
          </ButtonGoBackTrack>
          <ButtonPlayTrack type="button" onClick={handlePlayPause}>
            {!playTrack && <IoMdPlay />}
            {playTrack && <IoMdPause />}
          </ButtonPlayTrack>
          <ButtonGoNextTrack type="button" onClick={handleNextTrack}>
            <IoMdSkipForward />
          </ButtonGoNextTrack>
        </StackActions>

        <ButtonMinimizeMaximize>
          <HStackTimeTrack>
            <p>1:25</p>
            <p>{` / ${track.duration}`}</p>
          </HStackTimeTrack>

          <HStackInfo>
            <BoxImage src="https://cdns-images.dzcdn.net/images/cover/37bd682fd0b5000101566a3625126482/250x250-000000-80-0-0.jpg" />
            <VStack>
              <p>{track.title}</p>
              <p>{track.artist}</p>
            </VStack>
          </HStackInfo>

          <MdKeyboardArrowUp />
        </ButtonMinimizeMaximize>
      </Footer>
    </Container>
  )
}