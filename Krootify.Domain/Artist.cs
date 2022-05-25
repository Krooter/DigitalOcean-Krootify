using System;
using System.Collections.Generic;

namespace Domain
{
    public class Artist : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SceneName { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int Age => (DateTime.Today - DateOfBirth).Days / 365;
        public ICollection<Song> Songs { get; set; }
    }
}