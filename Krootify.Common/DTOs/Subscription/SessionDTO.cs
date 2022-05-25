using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTOs.Subscription
{
    public  class SessionDTO
    {
        public string SessionId { get; set; }
        public string Url { get; set; }
        public string CancelUrl { get; set; }
        public string SuccessUrl { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
