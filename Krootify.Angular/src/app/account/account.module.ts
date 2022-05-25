import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { AccountRoutingModule } from './account-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field/';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { AccountPanelComponent } from './account-panel/account-panel.component';
import { LayoutModule } from '../layout/layout.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
    MatButtonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    LayoutModule,
    MaterialFileInputModule
  ]
})
export class AccountModule { }
