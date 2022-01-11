import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  //validando com uma MENSAGEM na tela via TOAST
  login(){
    this.toast.error('Usuários e/ou Senha inválido!');
    this.creds.senha='',//resetando os campos de login/senha
    this.creds.email=''
  }
  //validando campo de login e senha, para habilitar "Button"
  validaCampos(): boolean{
    if(this.email.valid && this.senha.valid) {
      return true
    }
    return false;
  }

}
