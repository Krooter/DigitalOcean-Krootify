import { AccountService } from './../../_services/account.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInteceptor implements HttpInterceptor {

    constructor(private accountService: AccountService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.accountService.getToken()}`
            }
          });
          return next.handle(req);
    }
}