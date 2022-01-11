import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean{
    if(this.email.valid && this.senha.valid) {
      return true
    }
    return false;
  }

}
