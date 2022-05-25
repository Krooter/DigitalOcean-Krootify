
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.Song
{
    public class PhotoToUpdateDTO
    {
        [Required]
        public IFormFile Photo { get; set; }
    }
}
