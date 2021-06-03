export interface ITrack {
  id: number;
  title: string;
  artist: string;
  duration: number;
  image: string;
  preview: string;
}

export interface IFavoriteTracksState {
  data: ITrack[];
}