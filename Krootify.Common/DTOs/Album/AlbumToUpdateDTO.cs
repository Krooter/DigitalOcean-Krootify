using System;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.Album
{
    public class AlbumToUpdateDTO
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
    }
}
