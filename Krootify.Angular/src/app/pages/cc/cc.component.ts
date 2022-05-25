import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { duration } from 'moment';
import { StripeSubscriptionService } from 'src/app/api/services';
import { IUser } from 'src/app/_models/User/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss'],
})
export class CcComponent implements OnInit {
  constructor(
    private stripeSubscriptionService: StripeSubscriptionService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (params?.email) {
        const response = await this.stripeSubscriptionService
          .apiStripeSubscriptionAfterPurchasePost$Json({
            sessionId: params.email,
          })
          .toPromise();

        if (response) {
          this.accountService.currentUser$.subscribe((x) => {
            const user: IUser = x;
            if (x.subscription.subscriptionStatus != 2) {
              user.subscription.subscriptionStatus = 2;
              this.accountService.currentUserSource.next(user);
              return;
            }
          });

          this.matSnackBar.open(
            `You own a Krootify subscription, thank you for your purchase!`,
            null,
            {
              duration: 3000,
            }
          );
          this.router.navigate(['/'], {
            replaceUrl: true,
          });
        }
      }
    });
  }
}
