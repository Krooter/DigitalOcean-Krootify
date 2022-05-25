using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SubscriptionPlan
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Interval { get; set; }

        public string Currency { get; set; }

        public string Ammount { get; set; }
    }
}
