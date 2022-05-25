import { ServerErrorComponent } from './shared/server-error/server-error.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { CcComponent } from './pages/cc/cc.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((mod) => mod.AccountModule),
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'pricing',
    component: PricingComponent,
    loadChildren: () =>
      import('./pages/pricing/pricing.module').then((mod) => mod.PricingModule),
  },
  {
    path: 'pricing/cc',
    component: CcComponent,
    loadChildren: () =>
      import('./pages/cc/cc.module').then((mod) => mod.CcModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
