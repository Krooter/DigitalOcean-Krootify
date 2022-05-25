import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  SubscriptionPlan,
  SubscriptionSession,
  SubscriptionStatus,
} from 'src/app/api/models';
import { StripeSubscriptionService } from 'src/app/api/services';
import { IUser } from 'src/app/_models/User/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  currentUser: IUser;
  subscriptionPlans: SubscriptionPlan[];

  constructor(
    private elementRef: ElementRef,
    private accountService: AccountService,
    private stripeSubscriptionService: StripeSubscriptionService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#4158D0';
    this.elementRef.nativeElement.ownerDocument.body.style.background =
      '-webkit-linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%) fixed';
    this.subscriptionPlans = await this.stripeSubscriptionService
      .apiStripeSubscriptionPlansGet$Json()
      .toPromise();

    this.subscriptionPlans.reverse();

    var period = ['Monthly', 'Yearly'];

    var yearlyDescriptionStrings = [
      'Play any track',
      'No advertisement interrupsions',
      'Unlimited skips',
      'High quality audio',
      'Save 17% with yearly plan',
    ];

    var monthDescriptionStrings = [
      'Play any track',
      'No advertisement interrupsions',
      'Unlimited skips',
      'High quality audio',
    ];

    var descriptionStrings = [
      monthDescriptionStrings,
      yearlyDescriptionStrings,
    ];

    this.subscriptionPlans.forEach((element, i) => {
      this.subscriptionPlans[i].ammount = (
        parseInt(element.ammount) / 100
      ).toString();
      this.subscriptionPlans[i].period = period[i];
      this.subscriptionPlans[i].descriptionStrings = descriptionStrings[i];
    });

    this.accountService.currentUser$.subscribe((x) => {
      this.currentUser = x;
    });
  }

  async purchase(item: SubscriptionPlan) {
    if (!this.currentUser) {
      this.router.navigate(['account/register']);
      return;
    }

    if (
      this.currentUser?.subscription?.subscriptionStatus ===
      SubscriptionStatus.Active
    ) {
      this.alreadyOwn();
      return;
    }

    const sessionData: SubscriptionSession = {
      successUrl: origin + '/pricing/cc?email=' + this.currentUser.email,
      cancelUrl: origin + '/pricing',
      email: this.currentUser.email,
      productId: item.id,
    };

    const response = await this.stripeSubscriptionService
      .apiStripeSubscriptionSessionPost$Json({
        body: sessionData,
      })
      .toPromise();

    const stripe = (window as any).Stripe(environment.stripePublicKey);
    stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });
  }

  alreadyOwn() {
    this.matSnackBar.open(
      'You already own this product, go to library and use it.',
      null,
      {
        duration: 3000,
      }
    );
  }
}
