import { AccountService } from './../../_services/account.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errors!: string[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      'white';
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'white';
    this.createLoginForm();
    if (this.accountService.isLoggedIn()) {
      this.router.navigateByUrl('/main');
    }
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
        ),
      ]),
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this.accountService.loadCurrentUser();
        this.router.navigateByUrl('/main');
      },
      (error) => {
        this._snackBar.open(error.error.message, 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
