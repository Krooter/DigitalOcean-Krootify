using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Extensions.Specifications
{
    public class SubscriptionSpecification : BaseSpecification<Subscription>
    {
        public SubscriptionSpecification(string subscriptionId, string userId) : base(x => x.SubscriptionId == subscriptionId || x.UserId == userId)
        {

        }
    }
}
