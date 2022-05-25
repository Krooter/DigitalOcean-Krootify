using Common.DTOs.Song;
using System;
using System.Collections.Generic;

namespace Common.DTOs
{
    public class AlbumToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<SongForAlbumAndArtistDTO> Songs { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}