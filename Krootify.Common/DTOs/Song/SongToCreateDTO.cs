
using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.Song
{
    public class SongToCreateDTO
    {
        [Required]
        [MinLength(5, ErrorMessage = "Name should be more than 5 characters!")]
        [MaxLength(50, ErrorMessage = "Name should be less than 50 characters!")]
        public string Name { get; set; }
        [Required]
        public IFormFile Song { get; set; }
        [Required]
        public IFormFile Photo { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        public int ArtistId { get; set; }
        [Required]
        public int AlbumId { get; set; }
        [Required]
        public int SongCategoryId { get; set; }
        [Required]
        public int SongGenreId { get; set; }
    }
}
