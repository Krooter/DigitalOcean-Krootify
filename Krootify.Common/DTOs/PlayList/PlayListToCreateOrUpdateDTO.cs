
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.PlayList
{
    public class PlayListToCreateOrUpdateDTO
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [Required]
        public IFormFile Photo { get; set; }
    }
}
