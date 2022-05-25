
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.User
{
    public class UpdateEmailDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Token { get; set; }
    }
}
