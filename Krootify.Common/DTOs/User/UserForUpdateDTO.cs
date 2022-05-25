using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.User
{
    public class UserForUpdateDTO
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Name should be less than 50 characters!")]
        [MinLength(5, ErrorMessage = "Name should be more than 5 characters!")]
        public string Username { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            ErrorMessage = "Password should be created from minimum eight characters, at least one letter, one number and one special character.")]
        public string Password { get; set; }
    }
}
