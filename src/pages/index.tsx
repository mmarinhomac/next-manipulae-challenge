import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { RiSearchLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import deezer from '../services/deezer';
import next from '../services/next';

import { TrackList } from '../components/TrackList';
import { Player } from '../components/Player';

import { IState } from '../store';
import { ITrack } from '../store/modules/tracks/types';
import { IPlayerState } from '../store/modules/player/types';

import { addTracksToPlaylist } from '../store/modules/tracks/actions';
import { closePlayer } from '../store/modules/player/actions';

import { 
  Container, 
  ContainerAlignContent, 
  InputBox, 
  CarouselMenu,
  CarouselItem,
  CustomIndicator
} from '../styles/home.styles';

export default function Home({ initialTracks }) {
  const dispatch = useDispatch();

  const favorites = useSelector<IState, ITrack[]>(state => state.favorites.data);
  const player = useSelector<IState, IPlayerState>(state => state.player);

  const [searchTimeInstance, setSearchTimeInstance] = useState(null);
  const [initialDataTracks, setInitialDataTracks] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState('most_popular');
  const [isOpenPlayer, setIsOpenPlayer] = useState(false);

  function handleSearch(evt) {
    setLoading(true);
    const value = evt.target.value;
    
    if (searchTimeInstance !== null) {
      clearTimeout(searchTimeInstance);
    }
    if (initialDataTracks !== null) {
      clearTimeout(initialDataTracks);
    }

    if (value) {
      if (value.length >= 3) {
        const time = setTimeout(async () => {
          const response = await next.get(`/search?q=${value}`);
          setSearchData(response.data);
          setLoading(false);
        }, 1400);
        setSearchTimeInstance(time);
      } else {
        const time = setTimeout(async () => {
          setSearchData(null);
          setLoading(false);
        }, 1400);
        setInitialDataTracks(time);
      }
    } else {
      const time = setTimeout(async () => {
        setSearchData(null);
        setLoading(false);
      }, 1400);
      setInitialDataTracks(time);
    }
  }

  useEffect(() => {
    if (searchData) {
      dispatch(addTracksToPlaylist(searchData));
    } else if (menu === 'most_popular') {
      dispatch(addTracksToPlaylist(initialTracks));
    } else {
      dispatch(addTracksToPlaylist(favorites));
    }
  }, [menu, searchData]);
  
  useEffect(() => {
    if (player.status === 'opened' || player.status === 'preview_failure') {
      setIsOpenPlayer(true);
    }

    if (player.status === 'preview_failure') {
      const time = setTimeout(() => {
        setIsOpenPlayer(false);
        dispatch(closePlayer());
        clearTimeout(time);
      }, 3200);
    }
  }, [player]);

  return (
    <Container>
      <Head>
        <title>deezer.redesign</title>
      </Head>
      
      <ContainerAlignContent>
        <header>
          <div>
            <p>Hello,</p>
            <p>what you want to hear today?</p>
          </div>

          <InputBox isLoading={!!loading}>
            {!loading && <RiSearchLine />}
            {loading && <AiOutlineLoading3Quarters />}
            <input type="text" placeholder="Search Album, Artist or Title" onChange={handleSearch}/>
          </InputBox>
        </header>

        <CarouselMenu appear={!!searchData}>
          <CarouselItem 
            type="button" 
            isActive={menu}
            optionMenu='most_popular'
            onClick={() => setMenu('most_popular')}
          >
            Most popular
            <CustomIndicator />
          </CarouselItem>
          <CarouselItem 
            type="button"
            isActive={menu}
            optionMenu='favorites'
            onClick={() => setMenu('favorites')}
          >
            Favoritos
            <CustomIndicator />
          </CarouselItem>
        </CarouselMenu>

        <TrackList data={searchData ? searchData : 
          (menu === 'most_popular' ? initialTracks:
          favorites)
          }
        />

        {isOpenPlayer && <Player />}
      </ContainerAlignContent>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await deezer.get('/chart/tracks');

  const initialTracks = response.data.tracks.data.map(track => {
    const indexAuxDuration = String(track.duration / 60).indexOf('.');

    return {
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      duration: String(Number(
          String(track.duration / 60).substring(0, indexAuxDuration + 3)
        ).toFixed(2)
        ).replace('.', ':'),
      image_medium: track.album.cover_medium,
      image_big: track.album.cover_xl,
      preview: track.preview,
      link: track.link
    }
  })

  return {
    props: {
      initialTracks
    },
    revalidate: 60 * 60 * 12, // 1 hour
  }
}