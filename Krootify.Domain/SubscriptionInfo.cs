using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SubscriptionInfo : BaseEntity
    {
        public string SubscriptionId { get; set; }

        public PlanPeriod PlanPeriod { get; set; }

        public string UserId { get; set; }

        public DateTime ExpireAt { get; set; }

        public bool AutoRenewStatus { get; set; }

        public DateTime StartDate { get; set; }

        public decimal Price { get; set; }

        public string ProductId { get; set; }

        public SubscriptionStatus Status { get; set; }
    }
}
