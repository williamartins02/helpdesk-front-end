import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  hide = true;
  
  cliente: Cliente = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }

  /*Validação usando o FormControl*/
  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =        new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<ClienteCreateComponent>,

  ) { }

  ngOnInit(): void {
  }

 /*Metodo para criar um Cliente*/
  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Cadastrado(a) com sucesso',  'Cliente ' + this.cliente.nome);
      this.router.navigate(['/clientes']);//assim que salvar voltar para pagina ListClientes
      this.onNoClick();
    }, (err) => {
        if(err.error.errors)//tratado erro com lista de erro dentro do arrays
           err.error.errors.forEach((element) => {
             this.toast.error(element.message);
           });    
      this.toast.error(err.error.message)
    })
  }

  /*Adicionando um perfil com CheckBox/ verificando se ja existe na lista ao clicar/desclicar*/
  addPerfil(perfil: any): void {
       /*Verificando se existe o tencico ja na lista de perfils ao desmarca a opção*/
       if(this.cliente.perfis.includes(perfil)) {//verificando se ja tem o objeto na lista de perfil.
        this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);//se tiver o perfil ja na lista remove
       }
       this.cliente.perfis.push(perfil);//adicionado o perfil clicado// se lee não tiver na lista, adicionar..
  }

   /* validando o retorno dos campos.*/
   validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
