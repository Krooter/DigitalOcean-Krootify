using System;
using System.Collections.Generic;

namespace Domain
{
    public class Album : BaseEntity
    {
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<Song> Songs { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}