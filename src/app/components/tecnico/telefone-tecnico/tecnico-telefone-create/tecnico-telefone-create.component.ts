import { TecnicoService } from './../../../../services/tecnico.service';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TelefoneService } from './../../../../services/telefone.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Telefone } from './../../../../models/telefone';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tecnico } from 'src/app/models/tecnico';

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

  tecnicos: Tecnico[] = [];

   /*Validação usando o FormControl*/
   numero:         FormControl =  new FormControl(null, Validators.required);
   tecnico:        FormControl =  new FormControl(null, Validators.required);
   tipoTelefone:   FormControl =  new FormControl(null, Validators.required);
   senha:          FormControl =  new FormControl(null, Validators.required);
 
   constructor(
     private service: TelefoneService,
     private toast: ToastrService,
     private router: Router,
     public dialogRef: MatDialogRef<TecnicoTelefoneCreateComponent>,
     private tecnicoService: TecnicoService,
     @Inject(MAT_DIALOG_DATA) public data: {id: Number},
   ) { }
 
   ngOnInit(): void {
   }
 
  /*Metodo para criar um Tecnico*/
   async create(): Promise<void> {
     const payload = await this.generatePayload(this.data.id, this.telefone);
     this.service.create(payload).subscribe(() => {
       this.toast.success('Cadastrado(a) com sucesso',  'Telefone');
       this.router.navigate(['/telefones']);//assim que salvar voltar para pagina ListTecnicos
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
     return this.numero.valid && this.tipoTelefone.valid 
   }
 
   onNoClick(): void {
     this.dialogRef.close();
   }
   

   private async generatePayload(id: Number, telefone: Telefone): Promise<Telefone> {
      const tecnico = await this.tecnicoService.findById(id).toPromise();

      return {
        tipoTelefone: telefone.tipoTelefone,
        numero: telefone.numero,
        nomeTecnico: tecnico.nome,
        tecnico: tecnico.id
      }
   }
 }
 
