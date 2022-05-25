import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CcComponent } from './cc.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CcComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CcModule {}
