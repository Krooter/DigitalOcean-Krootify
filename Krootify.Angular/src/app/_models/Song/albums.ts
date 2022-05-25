import { ISong } from "./song";

export interface IAlbum {
    description: string;
    name: string;
    photoUrl: string;
    releaseDate: string;
    songs: ISong[];
    id: number;
  }