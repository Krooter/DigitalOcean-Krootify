
using Common.DTOs.Subscription;

namespace Common.DTOs.User
{
    public class UserForLoginDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string PhotoUrl { get; set; }
        public SubscriptionDTO Subscription { get; set; }
    }
}
