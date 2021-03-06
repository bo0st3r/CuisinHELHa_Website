import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {AuthenticationService} from '@app/services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      // UNAUTHORIZED ERROR
      if (err.status === 401) {
        // Auto logout if 401 response returned from api
        this.authService.logout();
        // location.reload(true);
        location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
