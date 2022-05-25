using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class SubscriptionSession
    {
        public string SuccessUrl { get; set; }
        public string CancelUrl { get; set; }
        public string ProductId { get; set; }
        public string Email { get; set; }
    }
}
