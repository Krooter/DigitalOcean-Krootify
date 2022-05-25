using System;
using System.Collections.Generic;

namespace Domain
{
    public class Song : BaseEntity
    {
        public string Name { get; set; }
        public string SongUrl { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int ArtistId { get; set; }
        public Artist Artists { get; set; }
        public int AlbumId { get; set; }
        public Album Albums { get; set; }
        public ICollection<PlayListSong> PlayLists { get; set; }
        public TimeSpan Duration { get; set; }
        public int Listeners { get; set; }
        public int SongGenreId { get; set; }
        public SongGenre SongGenres { get; set; }
        public int SongCategoryId { get; set; }
        public SongCategory SongCategories { get; set; }
    }
}
