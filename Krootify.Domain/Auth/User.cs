using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Auth
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age => (DateTime.Today - DateOfBirth).Days / 365;
        public Profile Profile { get; set; }
        public ICollection<PlayList> PlayLists { get; set; }
        public string GetFullName()
        {
            return FirstName + " " + LastName;
        }
    }
}
