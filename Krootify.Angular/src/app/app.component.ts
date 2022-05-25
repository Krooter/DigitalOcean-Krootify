import { AccountService } from './_services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Krootify';

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.loadLoggedUser();
  }

  loadLoggedUser() {
    const token = localStorage.getItem('token');
    if (token != null) {
      this.accountService.loadCurrentUser().subscribe(
        () => {},
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
