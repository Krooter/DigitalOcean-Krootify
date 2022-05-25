using Common.DTOs.Song;
using System;
using System.Collections.Generic;

namespace Common.DTOs.Artist
{
    public class ArtistToReturnDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SceneName { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public ICollection<SongForAlbumAndArtistDTO> Songs { get; set; }
    }
}