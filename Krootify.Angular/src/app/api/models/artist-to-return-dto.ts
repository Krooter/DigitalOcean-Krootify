/* tslint:disable */
/* eslint-disable */
import { SongForAlbumAndArtistDto } from './song-for-album-and-artist-dto';
export interface ArtistToReturnDto {
  age?: number;
  dateOfBirth?: string;
  firstName?: null | string;
  id?: number;
  lastName?: null | string;
  photoUrl?: null | string;
  sceneName?: null | string;
  songs?: null | Array<SongForAlbumAndArtistDto>;
}
