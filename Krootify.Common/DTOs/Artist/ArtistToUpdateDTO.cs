
using System;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.Artist
{
    public class ArtistToUpdateDTO
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        public string SceneName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
