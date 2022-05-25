using AutoMapper;
using Common.DTOs.Subscription;
using Domain;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Profiles
{
    public  class StripeProfile : Profile
    {
        public StripeProfile()
        {
            CreateMap<Price, SubscriptionPlan>()
                .ForMember(x => x.Id, options => options.MapFrom(d => d.ProductId))
                .ForMember(x => x.Ammount, options => options.MapFrom(d => d.UnitAmount))
                .ForMember(x => x.Interval, options => options.MapFrom(d => d.Recurring.Interval));
            CreateMap<Session, SessionDTO>().ForMember(x => x.SessionId, options => options.MapFrom(d => d.Id));
            CreateMap<Domain.Subscription, SubscriptionDTO>();
        }
    }
}
