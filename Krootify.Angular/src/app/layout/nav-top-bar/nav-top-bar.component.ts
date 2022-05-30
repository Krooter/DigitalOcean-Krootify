import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SubscriptionStatus } from 'src/app/_models/User/subscription-status-enum';
import { AccountPanelComponent } from './../../account/account-panel/account-panel.component';
import { IUser } from './../../_models/User/user';
import { AccountService } from './../../_services/account.service';

@Component({
  selector: 'app-nav-top-bar',
  templateUrl: './nav-top-bar.component.html',
  styleUrls: ['./nav-top-bar.component.scss'],
})
export class NavTopBarComponent implements OnInit {
  @Input() controls = true;
  currentUser$?: Observable<IUser>;
  isDisplayed = false;
  isSubscribed = false;
  public history_depth = 0;

  constructor(
    private accountService: AccountService,
    private location: Location,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;

    this.accountService.currentUser$.subscribe((x) => {
      this.isSubscribed =
        x?.subscription?.subscriptionStatus === SubscriptionStatus.Active;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x) => {});
  }

  logout() {
    this.accountService.logout();
  }

  back() {
    this.history_depth -= 1;
    this.location.back();
  }

  forward() {
    this.history_depth += 1;
    this.location.forward();
  }

  openProfileSettings() {
    this.dialog.open(AccountPanelComponent);
  }

  displayDropDownMenu() {
    if (this.isDisplayed) {
      this.isDisplayed = false;
    } else {
      this.isDisplayed = true;
    }
  }

  isAdmin() {
    return this.accountService.isAdmin();
  }

  openSideBar() {}
}
