using BLL.Interfaces;
using Common.DTOs.Subscription;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    public class StripeSubscriptionController : BaseApiController
    {
        private readonly IStripeSubscriptionService _stripeSubscriptionService;

        public StripeSubscriptionController(IStripeSubscriptionService stripeSubscriptionService)
        {
            _stripeSubscriptionService = stripeSubscriptionService;
        }

        [AllowAnonymous]
        [HttpPost("session")]
        public async Task<ActionResult<SessionDTO>> CreateStripeSession(SubscriptionSession subscriptionSession)
        {
            var intent = await _stripeSubscriptionService.CreateStripeIntent(subscriptionSession);

            return Ok(intent);
        } 

        [AllowAnonymous]
        [HttpPost("after-purchase")]
        public async Task<ActionResult<SubscriptionInfo>> CompleteStripeSession(string email)
        {
            var result = await _stripeSubscriptionService.UpdateUserInformation(email);

            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet("plans")]
        public async Task<ActionResult<IEnumerable<SubscriptionPlan>>> GetSubscriptionPlans()
        {
            var result = await _stripeSubscriptionService.GetAllSubscriptionPlans();

            return Ok(result);
        }
    }
}
