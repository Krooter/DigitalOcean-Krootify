
using System;
using System.Collections.Generic;

namespace Common.DTOs
{
    public class SongToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SongUrl { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Artists { get; set; }
        public int ArtistId { get; set; }
        public string Albums { get; set; }
        public int AlbumId { get; set; }
        public int Duration { get; set; }
        public int Listeners { get; set; }
        public string SongGenre { get; set; }
        public int SongGenreId { get; set; }
        public string SongCategory { get; set; }
        public int SongCategoryId { get; set; }
    }
}
