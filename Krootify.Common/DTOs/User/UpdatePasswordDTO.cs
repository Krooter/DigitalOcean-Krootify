﻿
using System.ComponentModel.DataAnnotations;

namespace Common.DTOs.User
{
    public class UpdatePasswordDTO
    {
        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            ErrorMessage = "Password should be created from minimum eight characters, at least one letter, one number and one special character.")]
        public string OldPassword { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            ErrorMessage = "Password should be created from minimum eight characters, at least one letter, one number and one special character.")]
        public string NewPassword { get; set; }
    }
}
