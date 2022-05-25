export interface ISong {
    id:           number;
    count:        number;
    name:         string;
    songUrl:      string;
    photoUrl:     string;
    releaseDate:  Date;
    artists:      string;
    albums:       string;
    duration:     number;
    listeners:    number;
    songGenre:    string;
    songCategory: string;
    songGenreId:    number;
    songCategoryId: number;
    artistId:      number;
    albumId:       number;
    dateAdded: string;
}