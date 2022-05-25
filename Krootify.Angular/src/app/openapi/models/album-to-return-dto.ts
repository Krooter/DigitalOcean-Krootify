/* tslint:disable */
/* eslint-disable */
import { SongForAlbumAndArtistDto } from './song-for-album-and-artist-dto';
export interface AlbumToReturnDto {
  description?: null | string;
  name?: null | string;
  photoUrl?: null | string;
  releaseDate?: string;
  songs?: null | Array<SongForAlbumAndArtistDto>;
}
