import { AuthenticationService } from './../../services/authentication.service';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais ={
    email: '',
    senha: ''
  }
  //criando VALIDAÇÃO para campo LOGIN/SENHA
  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(4));

  //Dentro de CONSTRUCTOR fica todo SERVICE
  constructor(
    private toast: ToastrService,
    private service: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /*validando TOKEN para validação do login, chmandoo o EndPOint
  Passando o Baeren com "substring(7)" que ocupa 7 caracteres*/
  login(){
    this.service.authenticate(this.creds).subscribe(resposta  => {
      this.service.successLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    },() => {
      this.toast.error('Usuários e/ou senha inválidos')
    })
  }

  //validando campo de login e senha, para habilitar "Button"
  validaCampos(): boolean{
    //return this.email.valid && this.senha.valid
    if(this.email.valid && this.senha.valid) {
      return true
    }
    return false;
  }
}
