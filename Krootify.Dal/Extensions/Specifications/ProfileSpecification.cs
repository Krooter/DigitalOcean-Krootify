
using Domain.Auth;
using Microsoft.EntityFrameworkCore;

namespace Dal.Extensions.Specifications
{
    public class ProfileSpecification : BaseSpecification<Profile>
    {
        public ProfileSpecification(string userId) :base(x => x.UserId == userId)
        {
            AddInclude(x => x.Include(p => p.Subscription));
        }
    }
}
