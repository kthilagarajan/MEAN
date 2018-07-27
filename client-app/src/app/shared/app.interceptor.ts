import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwtToken = localStorage.getItem("userToken")
        let changedReq;
        if (jwtToken) {
            changedReq = req.clone({ headers: req.headers.set("Authorization", jwtToken) });
        } else {
            changedReq = req.clone({});
        }
        return next.handle(changedReq);
    }
}