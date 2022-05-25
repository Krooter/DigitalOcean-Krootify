import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/_models/User/user';
import { FileValidator } from 'ngx-material-file-input';
import { requiredFileType } from 'src/app/infrastructure/validators/requiredtype';
import { Validator } from 'src/app/infrastructure/validators/emailnottaken';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.scss'],
})
export class AccountPanelComponent implements OnInit {
  selected: string = 'email';
  passwordForm!: FormGroup;
  emailForm!: FormGroup;
  photoUpdateForm!: FormGroup;
  currentUser$?: Observable<IUser>;
  readonly photoMaxSize = 10485760;
  emailNotTakenValidator = new Validator(this.accountService);
  email: string = '';

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.currentUser$.subscribe((data) => {
      this.email = data.email;
    });
    this.loadPasswordForm();
    this.loadEmailForm();
    this.loadPhotoForm();
  }

  loadPasswordForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
        ),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
        ),
      ]),
    });
  }

  loadPhotoForm() {
    this.photoUpdateForm = new FormGroup({
      photo: new FormControl('', [
        Validators.required,
        FileValidator.maxContentSize(this.photoMaxSize),
        requiredFileType('[^\\s]+(.*?)\\.(jpg|png)$'),
      ]),
    });
  }

  get photo() {
    return this.photoUpdateForm.get('photo');
  }

  loadEmailForm() {
    this.emailForm = new FormGroup({
      token: new FormControl(this.accountService.getToken()),
      email: new FormControl(
        this.email,
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
        [this.emailNotTakenValidator.validateEmailNotTaken()]
      ),
    });
  }

  selectEmail() {
    this.selected = 'email';
  }

  selectPassword() {
    this.selected = 'password';
  }

  selectPhoto() {
    this.selected = 'photo';
  }

  selectSubscription() {
    this.selected = 'subscription';
  }

  close() {
    this.dialog.closeAll();
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    switch (this.selected) {
      case 'email':
        this.accountService.updateEmail(this.emailForm.value).subscribe(
          () => {
            if (token != null) {
              this.accountService.loadCurrentUser().subscribe(
                () => {},
                (error) => {
                  console.log(error);
                }
              );
              this.matSnackBar.open(
                'Your email address was changed successfully.',
                'Close',
                {
                  duration: 3000,
                }
              );
              this.dialog.closeAll();
            }
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 'password':
        this.accountService.updatePassword(this.passwordForm.value).subscribe(
          () => {
            this.matSnackBar.open(
              'Your password was changed successfully.',
              'Close',
              {
                duration: 3000,
              }
            );
            this.dialog.closeAll();
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      case 'photo':
        const formData = new FormData();
        formData.append(
          'photo',
          this.photoUpdateForm.get('photo')?.value.files[0],
          this.photoUpdateForm.get('photo')?.value.files[0].name
        );
        this.accountService.updatePhoto(formData).subscribe(
          () => {
            if (token != null) {
              this.accountService.loadCurrentUser().subscribe(
                () => {},
                (error) => {
                  console.log(error);
                }
              );
              this.matSnackBar.open(
                'Your profile image was changed successfully.',
                'Close',
                {
                  duration: 3000,
                }
              );
              this.dialog.closeAll();
            }
          },
          (error) => {
            console.log(error);
          }
        );
        break;
    }
  }
}
