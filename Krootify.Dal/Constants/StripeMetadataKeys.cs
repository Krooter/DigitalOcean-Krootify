using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Constants
{
    public static class StripeMetadataKeys
    {
        public const string UserProfileId = "userProfileId_" + _uniqueness;
        public const string ReceiptId = "receiptId_" + _uniqueness;
        public const string InstitutionRef = "institutionRef_" + _uniqueness;
        public const string PromoRef = "promoRef_" + _uniqueness;
        public const string UserCountry = "userCountry_" + _uniqueness;
        public const string PlanId = "planId_" + _uniqueness;
        public const string ProductId = "productId_" + _uniqueness;
        public const string ChannelRef = "channelRef_" + _uniqueness;
        public const string StripeSubscriptionId = "stripeSubscriptionId_" + _uniqueness;

        // add this to property names in stripe metadata so after receiving events from stripe (as json, containing this metadata)
        // we can safely recursively search it without using/knowing the json structure
        private const string _uniqueness = "M0otLj4zDqgiqxSKTC8z";
    }
}
