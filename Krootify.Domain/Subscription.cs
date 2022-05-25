using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Subscription : BaseEntity
    {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public DateTime? TrialStart { get; set; }

        public DateTime? TrialEnd { get; set; }

        public string PlanId { get; set; }

        public string SubscriptionId { get; set; }

        public SubscriptionStatus SubscriptionStatus { get; set; }
        public string UserId { get; set; }
    }
}
