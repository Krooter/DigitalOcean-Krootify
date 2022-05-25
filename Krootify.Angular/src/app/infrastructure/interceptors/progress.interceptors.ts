import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { ProgressService } from "src/app/_services/progress.service";

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

    constructor(private progressService: ProgressService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.progressService.progress();
        return next.handle(req).pipe(
            finalize(() => {
                this.progressService.idle();
            })
        )
    }

}