/* tslint:disable */
/* eslint-disable */
import { PlanPeriod } from './plan-period';
import { SubscriptionStatus } from './subscription-status';
export interface SubscriptionInfo {
  autoRenewStatus?: boolean;
  endDate?: string;
  id?: number;
  planPeriod?: PlanPeriod;
  price?: number;
  productId?: null | string;
  startDate?: string;
  subscriptionStatus?: SubscriptionStatus;
  subscriptionId?: null | string;
  userId?: null | string;
}
