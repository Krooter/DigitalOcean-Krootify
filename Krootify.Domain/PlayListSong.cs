using System;

namespace Domain
{
    public class PlayListSong : BaseEntity
    {
        public int PlayListId { get; set; }
        public PlayList PlayLists { get; set; }
        public int SongId { get; set; }
        public Song Songs { get; set; }
        public DateTime DateAdded { get; set; }
        public double GetDuration()
        {
            return Songs.Duration.TotalSeconds;
        }
    }
}