import { AdminModule } from './admin/admin.module';
import { AccountModule } from './account/account.module';
import { PagesModule } from './pages/pages.module';
import { ErrorInterceptor } from './infrastructure/interceptors/error.interceptors';
import { TokenInteceptor } from './infrastructure/interceptors/token.interceptors';
import { ProgressInterceptor } from './infrastructure/interceptors/progress.interceptors';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ApiModule } from './api/api.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    PagesModule,
    AccountModule,
    AdminModule,
    ApiModule.forRoot({ rootUrl: environment.openApiUrl }),
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInteceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
