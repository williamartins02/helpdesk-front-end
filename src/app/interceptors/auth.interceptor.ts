
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

/*Intercpetor para requisição do TOKEN adicionando no cabeçalho, para acessar ENDPOINT exp "Listar list" no front.*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
        if(token){
           const cloneReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)});
           return next.handle(cloneReq);
        }
    return next.handle(request);
  }
}

export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    userClass: AuthInterceptor,
    multi: true
  }
]
