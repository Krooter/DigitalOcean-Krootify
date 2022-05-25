
using System;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.PlayList
{
    public class PlayListSongToCreateDTO
    {
        [Required]
        public int SongId { get; set; }
        [Required]
        public int PlayListId { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
