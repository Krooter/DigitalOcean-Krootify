
using System;
using System.Collections.Generic;

namespace Common.DTOs.PlayList
{
    public class PlayListWithSongsToReturnDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PlayListSongsForReturnDTO> Songs { get; set; }
        public DateTime DateAdded { get; set; }
        public string User { get; set; }
    }
}
