import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PricingComponent } from './pricing.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [{ path: '', component: PricingComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), MatSnackBarModule],
})
export class PricingModule {}
