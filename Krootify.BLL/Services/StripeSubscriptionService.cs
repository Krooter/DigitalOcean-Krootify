using AutoMapper;
using BLL.Interfaces;
using Common.DTOs.Subscription;
using Dal.Constants;
using Dal.Extensions.Specifications;
using Dal.Interfaces;
using Domain;
using Domain.Auth;
using Domain.Enum;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class StripeSubscriptionService : IStripeSubscriptionService
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IRepository<Domain.Subscription> _subscriptionRepo;
        private readonly IRepository<Domain.Auth.Profile> _profileRepo;
        private readonly UserManager<User> _userManager;

        public StripeSubscriptionService(IConfiguration configuration, IMapper mapper, IRepository<Domain.Subscription> subscriptionRepo, 
            IRepository<Domain.Auth.Profile> profileRepo, UserManager<User> userManager)
        {
            _configuration = configuration;
            _mapper = mapper;
            _subscriptionRepo = subscriptionRepo;
            _profileRepo = profileRepo;
            _userManager = userManager;
            StripeConfiguration.ApiKey = _configuration["StripeSettings:SecretKey"];
        }

        public Task CancelSubscription(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<SessionDTO> CreateStripeIntent(SubscriptionSession subscriptionSession)
        {
            var user = await _userManager.FindByEmailAsync(subscriptionSession.Email);

            var spec = new ProfileSpecification(user.Id);
            var profile = await _profileRepo.GetEntityWithSpec(spec);

            var priceOptions = new PriceListOptions { Limit = 2 };
            var priceService = new PriceService();

            var product = priceService.List(priceOptions).FirstOrDefault(x => x.ProductId == subscriptionSession.ProductId);

            var sessionOptions = new SessionCreateOptions
            {
                SuccessUrl = subscriptionSession.SuccessUrl,
                CancelUrl = subscriptionSession.CancelUrl,
                LineItems = new List<SessionLineItemOptions>
                  {
                    new SessionLineItemOptions
                    {
                      Price = product.Id,
                      Quantity = 1,
                    },
                  },
                Mode = "subscription",
                CustomerEmail = subscriptionSession.Email,
                ClientReferenceId = user.Id,
            };

            var sessionService = new SessionService();
            var session = sessionService.Create(sessionOptions);

            Domain.Subscription subscription = new Domain.Subscription
            {
                StartDate = DateTime.UtcNow,
                EndDate = session.ExpiresAt,
                PlanId = subscriptionSession.ProductId,
                SubscriptionId = session.Id,
                SubscriptionStatus = SubscriptionStatus.Pending,
                UserId = user.Id
            };

            if (profile.Subscription != null)
            {
                var existingSubscription = await _subscriptionRepo.GetById(profile.Subscription.Id);

                if (existingSubscription != null && existingSubscription.SubscriptionStatus == SubscriptionStatus.Active)
                {
                    return null;
                }

                existingSubscription.SubscriptionId = subscription.SubscriptionId;
                existingSubscription.SubscriptionStatus = subscription.SubscriptionStatus;
                existingSubscription.EndDate = subscription.EndDate;
                existingSubscription.StartDate = subscription.StartDate;
                existingSubscription.PlanId = subscription.PlanId;

                profile.Subscription = existingSubscription;
                _profileRepo.Update(profile);
            } 
            else
            {
                profile.Subscription = subscription;
                _profileRepo.Update(profile);
            }
            await _profileRepo.SaveChangesAsync();
            return _mapper.Map<SessionDTO>(session);
        }

        public async Task<IEnumerable<SubscriptionPlan>> GetAllSubscriptionPlans()
        {
            var priceOptions = new PriceListOptions { Limit = ApplicationConstants.PlanNames.Count() };
            var priceService = new PriceService();

            var products = priceService.List(priceOptions);

            IList<SubscriptionPlan> mappedProducts = _mapper.Map<IList<SubscriptionPlan>>(products);
            for (int i = 0; i < mappedProducts.Count(); i++)
            {
                mappedProducts[i].Name = ApplicationConstants.PlanNames[i];
            }
            return mappedProducts;
        }

        public async Task<Domain.Subscription> UpdateUserInformation(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            var spec = new SubscriptionSpecification(null, user.Id);
            var sessionId = (await _subscriptionRepo.GetEntityWithSpec(spec)).SubscriptionId;

            var service = new SessionService();
            var result = service.Get(sessionId);

            if(result.PaymentStatus == "paid")
            {
                var subscriptionService = new SubscriptionService();

                var subscriptionInfo = subscriptionService.Get(result.SubscriptionId);

                var options = new SubscriptionUpdateOptions
                {
                    TrialEnd = DateTime.UtcNow.AddDays(7),
                };

                subscriptionService.Update(subscriptionInfo.Id, options);

                var subscriptionSpec = new SubscriptionSpecification(sessionId, null);

                var subscription = await _subscriptionRepo.GetEntityWithSpec(subscriptionSpec);

                subscription.SubscriptionId = result.SubscriptionId;
                subscription.EndDate = subscriptionInfo.CurrentPeriodEnd.AddDays(7);
                subscription.StartDate = subscriptionInfo.CurrentPeriodStart.AddDays(7);
                subscription.TrialEnd = DateTime.UtcNow.AddDays(7);
                subscription.TrialStart = DateTime.UtcNow;
                subscription.SubscriptionStatus = SubscriptionStatus.Active;

                _subscriptionRepo.Update(subscription);
                await _subscriptionRepo.SaveChangesAsync();

                return subscription;
            }

            return null;
        }
    }
}
