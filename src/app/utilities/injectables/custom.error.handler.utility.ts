import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerStoreUtility, ResponseHandlerT } from './store/error.handler.store.utility';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(private errorHandlerStoreUtility: ErrorHandlerStoreUtility) {}

  invokeErrorHandlers = (err: HttpErrorResponse) => {
    this.errorHandlerStoreUtility.store.forEach(x => x(err));
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // Handle the error here
          this.invokeErrorHandlers(err);
        }
        // Rethrow the error if needed
        throw err;
      })
    );
  }

  addOnErrorHandler(handler: ResponseHandlerT) {
    this.errorHandlerStoreUtility.store.push(handler); // Correcting the push method
  }
}
