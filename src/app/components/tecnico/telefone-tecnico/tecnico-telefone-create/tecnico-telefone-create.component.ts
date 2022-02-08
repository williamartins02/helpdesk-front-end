import { GenericDialogComponent } from './../../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../../models/dialog/generic-dialog/generic-dialog';
import { throwError } from 'rxjs';
import { TecnicoService } from './../../../../services/tecnico.service';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TelefoneService } from './../../../../services/telefone.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Telefone } from './../../../../models/telefone';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
   private genericDialog: GenericDialog;
   private matDialogRef: MatDialogRef<GenericDialogComponent>;
 
   constructor(
     private service: TelefoneService,
     private toast: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
     public dialogRef: MatDialogRef<TecnicoTelefoneCreateComponent>,
     private tecnicoService: TecnicoService,
     public dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: {id: Number},
   ) {
    this.genericDialog = new GenericDialog(dialog);
    }
 
   ngOnInit(): void {
     this.findById();
     this.routeIdUrl();
   }

   routeIdUrl(): void {
    this.telefone.id = this.route.snapshot.paramMap.get("id"); //passando id para o editar via url
  }
   findById(): void {
    this.service.findById(this.data.id).subscribe((resposta) => {
      },(error) => {
          this.toast.error("ao chamar Telefones ID", "ERROR");
          return throwError(error.error.error);
        }
    );
  }
 
  /*Metodo para criar um Tecnico*/
   async create(): Promise<void> {
      this.onNoClick();
      const payload = await this.generatePayload(this.data.id, this.telefone);
      const matDialogRef = this.genericDialog.loadingMessage("Salvando Telefone...");
      this.service.create(payload).subscribe(() => {
       setTimeout(() =>{
          matDialogRef.close();
          this.toast.success('Cadastrado(a) com sucesso',  'Telefone');
          this.router.navigate(['/telefones']);//assim que salvar voltar para pagina ListTecnicos
       },1000)
     }, (err) => {
      matDialogRef.close();
         if(err.error.errors)//tratado erro com lista de erro dentro do arrays
            err.error.errors.forEach((element) => {
              this.toast.error(element.message);
            });    
       this.toast.error(err.error.message)
     })
   }
   /*Passando informações para serem gravada, telefone */
   private async generatePayload(id: Number, telefone: Telefone): Promise<Telefone> {
    const tecnico = await this.tecnicoService.findById(id).toPromise();

    return {
      tipoTelefone: telefone.tipoTelefone,
      numero: telefone.numero,
      nomeTecnico: tecnico.nome,
      tecnico: tecnico.id
    }
 }
 

    /* validando o retorno dos campos.*/
    validaCampos(): boolean {
     return this.numero.valid && this.tipoTelefone.valid 
   }
 
   onNoClick(): void {
     this.dialogRef.close();
   }
   

 
 }
 
