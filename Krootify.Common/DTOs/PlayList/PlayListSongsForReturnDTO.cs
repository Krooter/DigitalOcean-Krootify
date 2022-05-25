using System;

namespace Common.DTOs.PlayList
{
    public class PlayListSongsForReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SongUrl { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Artists { get; set; }
        public string Albums { get; set; }
        public int Listeners { get; set; }
        public DateTime? DateAdded { get; set; }
        public double? Duration { get; set; }
        public string UserId { get; set; }
    }
}