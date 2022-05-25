import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private snackBar: MatSnackBar){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if(error){
                    if(error.error.errors) {
                        throw error.error;
                      } else {
                        this.snackBar.open(error.error.message + ' ' + error.error.statusCode, 'Close', {
                            duration: 3000
                        });
                      }
                    if(error.status === 401){
                        this.snackBar.open(error.error.message + ' ' + error.error.statusCode, 'Close', {
                            duration: 3000
                        });
                    }
                    if(error.status === 404){
                        this.router.navigateByUrl('/not-found');
                    }
                    if(error.status === 500){
                        const navigationExtras: NavigationExtras = {state: {error: error.error}}
                        this.router.navigateByUrl('/server-error', navigationExtras);
                    }
                }
                return throwError(error);
            })
        )
    }

}