import { SubscriptionInfo } from 'src/app/api/models';
export interface IUser {
  email: string;
  username: string;
  token: string;
  photoUrl: string;
  subscription: SubscriptionInfo;
}
