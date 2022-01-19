import { Credenciais } from './../models/credenciais';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

//autenticando LOGIN/SENHA para entrar no sistema, via ENDPOINT
authenticate(creds: Credenciais){
  return this.http.post(`${API_CONFIG.baseUrl}/login`, creds,{
    //pedindo para observar o TOKEN que vem tipo TEXTO, na respsota de login
    observe: 'response',
    responseType: 'text'
  });
}
/*Salvar dados mesmo com o fechamento do navegado*/
 successLogin(authToken: string){
   localStorage.setItem('token', authToken);
 }

 /**metodo para autenticar o TOKEN do usuario. */
 isAuthenticated(){
   let token = localStorage.getItem('token')
   if(token != null){//verificando se o token esta ativo ou expirado
     return !this.jwtService.isTokenExpired(token)
   }
   return false;
 }

 /*Metodo para limpar o (toke) */
 logout(){
   localStorage.clear();
 }

}
