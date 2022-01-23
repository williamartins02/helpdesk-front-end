
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TelefoneService } from './../../../../services/telefone.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Telefone } from './../../../../models/telefone';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tecnico-telefone-create',
  templateUrl: './tecnico-telefone-create.component.html',
  styleUrls: ['./tecnico-telefone-create.component.css']
})
export class TecnicoTelefoneCreateComponent implements OnInit {

  telefone: Telefone = {
    id:           '',
    numero:       '',
    tecnico:      '',
    tipoTelefone: '',
    nomeTecnico:  '',
  }

   /*Validação usando o FormControl*/
   numero:         FormControl =  new FormControl(null, Validators.required);
   tecnico:        FormControl =  new FormControl(null, Validators.required);
   tipotelefone:   FormControl =  new FormControl(null, Validators.required);
   senha:          FormControl =  new FormControl(null, Validators.required);
 
   constructor(
     private service: TelefoneService,
     private toast: ToastrService,
     private router: Router,
     public dialogRef: MatDialogRef<TecnicoTelefoneCreateComponent>,
 
   ) { }
 
   ngOnInit(): void {
   }
 
  /*Metodo para criar um Tecnico*/
   create(): void {
     this.service.create(this.telefone).subscribe(() => {
       this.toast.success('Cadastrado(a) com sucesso',  'Telefone');
       this.router.navigate(['/tecnicos']);//assim que salvar voltar para pagina ListTecnicos
       this.onNoClick();
     }, (err) => {
         if(err.error.errors)//tratado erro com lista de erro dentro do arrays
            err.error.errors.forEach((element) => {
              this.toast.error(element.message);
            });    
       this.toast.error(err.error.message)
     })
   }
 

    /* validando o retorno dos campos.*/
    validaCampos(): boolean {
     return this.numero.valid && this.tipotelefone.valid 
   }
 
   onNoClick(): void {
     this.dialogRef.close();
   }
 
 }
 
