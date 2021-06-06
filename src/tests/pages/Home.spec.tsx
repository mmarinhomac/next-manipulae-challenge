import { render } from '@testing-library/react';
import deezer from '../../services/deezer';
import { mocked } from 'ts-jest/utils';

import Home, { getStaticProps } from '../../pages';
import { openPlayerRequest } from '../../store/modules/player/actions';
import { ActionTypes } from '../../store/modules/player/types';


const track = {
  id: 370644601,
  title: "Vacation",
  artist: "Dirty Heads",
  duration: "2:56",
  image_medium: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
  image_big: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
  preview: "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
  link: "https:\/\/www.deezer.com\/track\/370644601"
}

const initialTracks = [
  {
    id: 370644601,
    title: "Vacation",
    artist: "Dirty Heads",
    duration: "3:48",
    image_medium: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
    image_big: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
    preview: "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
    link: "https:\/\/www.deezer.com\/track\/370644601"
  }
]

const dataResponse = [
  {
    "id": 370644601,
    "readable": true,
    "title": "Vacation",
    "title_short": "Vacation",
    "link": "https:\/\/www.deezer.com\/track\/370644601",
    "duration": 209,
    "rank": 929861,
    "explicit_lyrics": false,
    "explicit_content_lyrics": 0,
    "explicit_content_cover": 2,
    "preview": "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
    "md5_image": "f1bab17057a0f291f829c1c5f9872ed7",
    "artist": {
      "id": 389851,
      "name": "Dirty Heads",
      "link": "https:\/\/www.deezer.com\/artist\/389851",
      "picture": "https:\/\/api.deezer.com\/artist\/389851\/image",
      "picture_small": "https:\/\/cdns-images.dzcdn.net\/images\/artist\/7a37db1659088c9c1336f88ea3a7e09f\/56x56-000000-80-0-0.jpg",
      "picture_medium": "https:\/\/cdns-images.dzcdn.net\/images\/artist\/7a37db1659088c9c1336f88ea3a7e09f\/250x250-000000-80-0-0.jpg",
      "picture_big": "https:\/\/cdns-images.dzcdn.net\/images\/artist\/7a37db1659088c9c1336f88ea3a7e09f\/500x500-000000-80-0-0.jpg",
      "picture_xl": "https:\/\/cdns-images.dzcdn.net\/images\/artist\/7a37db1659088c9c1336f88ea3a7e09f\/1000x1000-000000-80-0-0.jpg",
      "tracklist": "https:\/\/api.deezer.com\/artist\/389851\/top?limit=50",
      "type": "artist"
    },
    "album": {
      "id": 42751601,
      "title": "Vacation",
      "cover": "https:\/\/api.deezer.com\/album\/42751601\/image",
      "cover_small": "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/56x56-000000-80-0-0.jpg",
      "cover_medium": "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
      "cover_big": "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/500x500-000000-80-0-0.jpg",
      "cover_xl": "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
      "md5_image": "f1bab17057a0f291f829c1c5f9872ed7",
      "tracklist": "https:\/\/api.deezer.com\/album\/42751601\/tracks",
      "type": "album"
    },
    "type": "track"
  }
];

jest.mock('react-redux', () => {
  return {
    useDispatch() {
      return () => {}
    },
    useSelector(state) {
      const stateSelector = state.toString().split('state.')[1];

      if (stateSelector.match('favorites.data')) {
        return [];
      }

      if (stateSelector.match('player')) {
        return {
          track,
          status: 'closed'
        };
      }
    }
  }
})

jest.mock('../../services/deezer')

describe('Home', () => {
  it('info map correctly', () => {
    const { container } = render(
      <Home initialTracks={initialTracks} />
    )
    expect(Array.from(container.querySelectorAll('p'))[1].innerHTML).toContain('what you want to hear today?')
  })

  it('load initial tracks', async () => {
    const deezerMocked = mocked(deezer.get);

    deezerMocked.mockResolvedValueOnce({
      data: {
        tracks: {
          data: dataResponse
        }
      }
    })

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          initialTracks
        },
        revalidate: 60 * 60 * 12,
      })
    )
  })

  it('action created when play a track', () => {
    const expectedAction = {
      type: ActionTypes.openPlayerRequest,
      payload: {
        track
      }
    }

    expect(openPlayerRequest(track)).toEqual(expectedAction)
  })
})
