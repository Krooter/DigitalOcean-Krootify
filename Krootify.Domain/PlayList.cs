using Domain.Auth;
using System;
using System.Collections.Generic;

namespace Domain
{
    public class PlayList : BaseEntity
    {
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PlayListSong> Songs { get; set; }
        public DateTime DateAdded { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public double GetDuration()
        {
            double duration = 0;
            foreach (var time in Songs)
            {
                duration += time.GetDuration();
            }

            return duration;
        }
    }
}