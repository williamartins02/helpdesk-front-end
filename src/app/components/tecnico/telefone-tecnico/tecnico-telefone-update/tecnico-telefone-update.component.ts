import { throwError } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { TelefoneService } from 'src/app/services/telefone.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';
import { Telefone } from 'src/app/models/telefone';

@Component({
  selector: 'app-tecnico-telefone-update',
  templateUrl: './tecnico-telefone-update.component.html',
  styleUrls: ['./tecnico-telefone-update.component.css']
})
export class TecnicoTelefoneUpdateComponent implements OnInit {

  telefone: Telefone = {
    id:           '',
    numero:       '',
    tecnico:      '',
    tipoTelefone: '',
    nomeTecnico:  '',
  }
  tecnicos: Tecnico = {
    id:         '',
    nome:       '',
    cpf:        '',
    email:      '',
    senha:      '',
    perfis:     [],
    dataCriacao: ''
  }
   /*Validação usando o FormControl*/
   numero:         FormControl =  new FormControl(null, Validators.minLength(21));
   tecnico:        FormControl =  new FormControl(null, Validators.required);
   tipoTelefone:   FormControl =  new FormControl(null, Validators.required);
  
 
   constructor(
     private service: TelefoneService,
     private toast: ToastrService,
     private router: Router,
     private route: ActivatedRoute,
     public dialogRef: MatDialogRef<TecnicoTelefoneUpdateComponent>,
     private tecnicoService: TecnicoService,
     @Inject(MAT_DIALOG_DATA) public data: {id: Number},
   ) { }
 
   ngOnInit(): void {
    this.findById();
   }
   findById(): void{
    this.service.findByTelefoneId(this.data.id).subscribe((resposta) =>{
      this.telefone = resposta
    },(error) => {
      this.toast.error("ao chamar ID TELEFONE", "ERROR");
      return throwError(error.error.error);
    })
  }

  update(): void{
    this.service.update(this.telefone).subscribe(() =>{
     this.toast.success("Editar com sucesso", "Telefonee Técnico(a)" + this.tecnicos.nome);
     this.router.navigate(['telefones']);
     this.onNoClick();
   },(error) => {
     this.toast.error("Ao adicionar um chamado", "ERROR");
     return throwError(error.error.error);
   });
 }

 retornaTipo(tipoTelefone: any): string {
  if(tipoTelefone == '0') {
    return 'CASA'
  } else if(tipoTelefone == '1') {
    return 'EMPRESA'
  } else {
    return 'CELULAR'
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
