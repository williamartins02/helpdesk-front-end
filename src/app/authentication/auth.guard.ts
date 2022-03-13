import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

/*Guard para acessar rotas, apos fazer o login.*/
export class AuthGuard implements CanActivate {

  /*sempre que for construido, me trazer o private authenticationService: AuthenticationService){}
    para autenticar o login.*/ 
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastrService,
    ){}
    
    /*Validando se esta AUTENTICADO.*/
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    let authenticated = this.authenticationService.isAuthenticated();

    if(authenticated){
      return true
    }
     this.router.navigate(['login']);/*Se não tiver autenticado, redirecionar para tela de LOGIN novamente.*/
     this.toast.warning("token inválido", "Emitir um novo!")
     return false
  }
  
}
