import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Message } from "../message/message.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((response: HttpErrorResponse): Observable<HttpEvent<Message>> => {
      console.log("intercept", response);
      const messageTO = Object.assign(new Message(), response.error);

      if (messageTO.status === 401 || messageTO.status === 403) {
        delete messageTO.message;
      }
      return throwError(messageTO);
    }));
  }
}
