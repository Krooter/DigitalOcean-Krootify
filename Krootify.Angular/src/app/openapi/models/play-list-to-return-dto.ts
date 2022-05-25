/* tslint:disable */
/* eslint-disable */
import { PlayListSongsForReturnDto } from './play-list-songs-for-return-dto';
export interface PlayListToReturnDto {
  dateAdded?: string;
  id?: number;
  name?: null | string;
  photoUrl?: null | string;
  songs?: null | Array<PlayListSongsForReturnDto>;
  user?: null | string;
}
