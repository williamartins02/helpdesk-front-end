import { TecnicoService } from './../../../services/tecnico.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

import { Tecnico } from "./../../../models/tecnico";

import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Telefone } from 'src/app/models/telefone';
import { TelefoneService } from 'src/app/services/telefone.service';

@Component({
  selector: 'app-telefone-create',
  templateUrl: './telefone-create.component.html',
  styleUrls: ['./telefone-create.component.css']
})
export class TelefoneCreateComponent implements OnInit {

  tecnicos: Tecnico[] = [];

  telefone: Telefone = {
    id: '',
    numero: '',
    tipoTelefone: '',
    tecnico: '',
    nomeTecnico: '',
  }

  numero:       FormControl = new FormControl(null, [Validators.required]);
  tipoTelefone: FormControl = new FormControl(null, [Validators.required]);
  tecnico:      FormControl = new FormControl(null, [Validators.required]);
 

  constructor(
    private telefoneService: TelefoneService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,

    public dialogRef: MatDialogRef<TelefoneCreateComponent>,
  
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    this.telefoneService.create(this.telefone).subscribe((resposta) =>{
     this.toast.success("Telefone criando com sucesso", "Novo chamado");
     this.router.navigate(['telefones']);
     this.onNoClick();
   },(error) => {
     this.toast.error("Ao adicionar um telefone", "ERROR");
     return throwError(error.error.error);
   });
 }

 onNoClick(): void {
  this.dialogRef.close();
}

}
