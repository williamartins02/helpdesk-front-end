import { throwError } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Telefone } from 'src/app/models/telefone';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
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
  }

  numero:       FormControl = new FormControl(null, [Validators.required]);
  tipoTelefone: FormControl = new FormControl(null, [Validators.required]);
  tecnico:      FormControl = new FormControl(null, [Validators.required]);
 

  constructor(
    private telefoneService: TelefoneService,
    private toast: ToastrService,
    private router: Router,

    public dialogRef: MatDialogRef<TelefoneCreateComponent>,
  
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    this.telefoneService.create(this.telefone).subscribe((resposta) =>{
     this.toast.success("Chamado criando com sucesso", "Novo chamado");
     this.router.navigate(['chamados']);
     this.onNoClick();
   },(error) => {
     this.toast.error("Ao adicionar um chamado", "ERROR");
     return throwError(error.error.error);
   });
 }

 onNoClick(): void {
  this.dialogRef.close();
}

}
