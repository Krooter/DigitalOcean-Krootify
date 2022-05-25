using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.User
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            ErrorMessage = "Password should be created from minimum eight characters, at least one letter, one number and one special character.")]
        public string Password { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Name should be less than 50 characters!")]
        [MinLength(5, ErrorMessage = "Name should be more than 5 characters!")]
        public string Username { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Name should be less than 50 characters!")]
        [MinLength(3, ErrorMessage = "Name should be more than 3 characters!")]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50, ErrorMessage = "Name should be less than 50 characters!")]
        [MinLength(3, ErrorMessage = "Name should be more than 3 characters!")]
        public string LastName { get; set; }
    }
}
