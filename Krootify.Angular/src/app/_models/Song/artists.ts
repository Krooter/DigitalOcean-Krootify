import { ISong } from "./song";

export interface IArtist {
    age: number;
    dateOfBirth: string;
    firstName: string;
    sceneName: string;
    id: number;
    lastName: string;
    photoUrl: string;
    songs: ISong[];
  }