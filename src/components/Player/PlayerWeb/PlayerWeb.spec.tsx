import { render } from '@testing-library/react';
import { PlayerWeb } from '.';

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

const tracks = [
  {
    id: 370644601,
    title: "Vacation",
    artist: "Dirty Heads",
    duration: "2:56",
    image_medium: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
    image_big: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
    preview: "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
    link: "https:\/\/www.deezer.com\/track\/370644601"
  },
  {
    id: 370644601,
    title: "Vacation",
    artist: "Dirty Heads",
    duration: "2:56",
    image_medium: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
    image_big: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
    preview: "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
    link: "https:\/\/www.deezer.com\/track\/370644601"
  },
  {
    id: 370644601,
    title: "Vacation",
    artist: "Dirty Heads",
    duration: "2:56",
    image_medium: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/250x250-000000-80-0-0.jpg",
    image_big: "https:\/\/cdns-images.dzcdn.net\/images\/cover\/f1bab17057a0f291f829c1c5f9872ed7\/1000x1000-000000-80-0-0.jpg",
    preview: "https:\/\/cdns-preview-7.dzcdn.net\/stream\/c-74a2d95fb0f5dc129975ff96a3b0affe-8.mp3",
    link: "https:\/\/www.deezer.com\/track\/370644601"
  }
]

global.window.HTMLMediaElement.prototype.play = async () => {
  await new Promise<void>(resolve => resolve());
};

jest.mock('react-redux', () => {
  return {
    useSelector(state) {
      const stateSelector = state.toString().split('state.')[1];
      
      if (stateSelector.match('player')) {
        return {
          track
        };
      }

      if (stateSelector.match('tracks.data')) {
        return tracks;
      }
    }
  }
})

describe('PlayerWeb', () => {  
  it('info map correctly', () => {  
    const { container } = render(
      <PlayerWeb />
    )
    expect(Array.from(container.querySelectorAll('p'))[0].innerHTML).toContain(track.title)
    expect(Array.from(container.querySelectorAll('p'))[1].innerHTML).toContain(track.artist)
  })
})
