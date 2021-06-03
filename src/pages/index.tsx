import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { RiSearchLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import deezer from '../services/deezer';
import next from '../services/next';

import { TrackList } from '../components/TrackList';

import { 
  Container, 
  ContainerAlignContent, 
  InputBox, 
  CarouselMenu,
  CarouselItem 
} from '../styles/home.styles';

export default function Home({ initialTracks }) {
  const [searchTimeInstance, setSearchTimeInstance] = useState(null);
  const [initialDataTracks, setInitialDataTracks] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSearch(evt) {
    setLoading(true);
    const value = evt.target.value;
    console.log('loading...')
    // Clear old times instances
    if (searchTimeInstance !== null) {
      clearTimeout(searchTimeInstance);
    }
    if (initialDataTracks !== null) {
      clearTimeout(initialDataTracks);
    }

    // Validate value, length and time for search or go back initial tracks
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

        <CarouselMenu>
          <CarouselItem isActive>
            Most popular
          </CarouselItem>
          <CarouselItem>
            Favoritos
          </CarouselItem>
        </CarouselMenu>

        <TrackList data={searchData ? searchData : initialTracks}/>
      </ContainerAlignContent>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await deezer.get('/chart/tracks');

  const initialTracks = response.data.tracks.data.map(track => {
    const indexAuxDuration = String(track.duration / 60).indexOf('.');
    const titleValidated = track.title.length > 30 ? 
      String(track.title).substring(0, 30) + '...' :
      track.title;
    return {
      id: track.id,
      title: titleValidated,
      artist: track.artist.name,
      duration: Number(
        String(track.duration / 60).substring(0, indexAuxDuration + 3)
      ).toFixed(2),
      image: track.album.cover_medium,
      preview: track.preview
    }
  })

  return {
    props: {
      initialTracks
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}