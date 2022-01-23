import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from './../../services/authentication.service';
import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toast: ToastrService,) { }

  //Metodo que inicia
  ngOnInit(): void {
   this.router.navigate(['tecnicos'])
  }

  /*Metodo para DESLOGAR e limpar o TOKEN do usuario do locaStorage */
  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('logout realizado com sucesso', 'Logout', {timeOut: 300})
  }
}
