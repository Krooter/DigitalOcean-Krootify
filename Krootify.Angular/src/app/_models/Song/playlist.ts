import { ISong } from "./song";

export interface IPlayList {
    id: number;
    name: string;
    photoUrl: string;
    songs: ISong[];
    dateAdded: Date;
    user: string;
    index: number;
}