using Domain.Enum;
using System;

namespace Common.DTOs.Subscription
{
    public class SubscriptionDTO
    {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime? TrialStart { get; set; }

        public DateTime? TrialEnd { get; set; }

        public SubscriptionStatus SubscriptionStatus { get; set; }

        public string UserId { get; set; }
    }
}
