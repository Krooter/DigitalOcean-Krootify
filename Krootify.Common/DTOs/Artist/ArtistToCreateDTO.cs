
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.Artist
{
    public class ArtistToCreateDTO
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
        public IFormFile Photo { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}
