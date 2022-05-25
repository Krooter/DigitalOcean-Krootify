namespace Domain.Auth
{
    public class Profile : BaseEntity
    {
        public string PhotoUrl { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public Subscription Subscription { get; set; }
    }
}