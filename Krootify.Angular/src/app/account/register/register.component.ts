import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Validator } from 'src/app/infrastructure/validators/emailnottaken';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  emailNotTakenValidator = new Validator(this.accountService);

  constructor(private accountService: AccountService, private router: Router, private _snackBar: MatSnackBar, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'white';
    this.createLoginForm();
    if(this.accountService.isLoggedIn()){
      this.router.navigateByUrl('/main');
    }
  }

  createLoginForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(4), 
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], 
        [this.emailNotTakenValidator.validateEmailNotTaken()]),
      password: new FormControl('', [Validators.required,  Validators.minLength(8), 
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
      username: new FormControl('', [Validators.required,  Validators.minLength(5), Validators.maxLength(50)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
    })
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(() => {
      this.router.navigateByUrl('/main');
    }, error => {
      this._snackBar.open(error.error.message, 'Close', {
        duration: 3000
      });
    })
  }
}
