import { AccountPanelComponent } from './../../account/account-panel/account-panel.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from './../../_services/account.service';
import { IUser } from './../../_models/User/user';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SubscriptionStatus } from 'src/app/_models/User/subscription-status-enum';
import { ActivatedRoute } from '@angular/router';

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
  private history_depth = 0;

  constructor(
    private accountService: AccountService,
    private location: Location,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.currentUser$.subscribe((x) => {
      this.isSubscribed =
        x?.subscription?.subscriptionStatus === SubscriptionStatus.Active;
    });
  }

  logout() {
    this.accountService.logout();
  }

  back() {
    this.history_depth += 1;
    this.location.back();
  }

  forward() {
    this.history_depth -= 1;
    this.location.forward();
  }

  openProfileSettings() {
    this.dialog.open(AccountPanelComponent);
  }

  isBackEnabled() {
    return this.history_depth > 0;
  }

  isForwardEnabled() {
    return this.history_depth < 0;
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
}
