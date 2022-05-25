using Common.DTOs.Subscription;
using Domain;
using Microsoft.Extensions.Primitives;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IStripeSubscriptionService
    {
        public Task<IEnumerable<SubscriptionPlan>> GetAllSubscriptionPlans();

        public Task CancelSubscription(string id);

        public Task<SessionDTO> CreateStripeIntent(SubscriptionSession subscriptionSession);

        public Task<Subscription> UpdateUserInformation(string sessionId);
    }
}
