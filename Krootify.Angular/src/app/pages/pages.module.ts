import { PageContentModule } from './page-content/page-content.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { LayoutModule } from '../layout/layout.module';
import { PricingComponent } from './pricing/pricing.component';
import { CcComponent } from './cc/cc.component';

@NgModule({
  declarations: [
    PagesComponent,
    PricingComponent,
    CcComponent
  ],
  imports: [
    PagesRoutingModule,
    PageContentModule,
    CommonModule,
    LayoutModule
  ]
})
export class PagesModule { }
