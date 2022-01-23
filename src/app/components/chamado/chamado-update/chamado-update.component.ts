import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chamado } from './../../../models/chamado';

import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ChamadoService } from "src/app/services/chamado.service";
import { TecnicoService } from "./../../../services/tecnico.service";
import { ClienteService } from "./../../../services/cliente.service";
import { Tecnico } from "./../../../models/tecnico";
import { Cliente } from "./../../../models/cliente";

import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }
 
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];


  prioridade:  FormControl = new FormControl(null, [Validators.required]);
  status:      FormControl = new FormControl(null, [Validators.required,]);
  titulo:      FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico:     FormControl = new FormControl(null, [Validators.required]);
  cliente:     FormControl = new FormControl(null, [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,

    public dialogRef: MatDialogRef<ChamadoUpdateComponent>,
  ) {}

  ngOnInit(): void {
    this.findaAllClientes();
    this.findAllTecnico();
  }

  update(): void{
     this.chamadoService.update(this.chamado).subscribe(() =>{
      this.toast.success("Chamado criando com sucesso", "Novo chamado");
      this.router.navigate(['chamados']);
      this.onNoClick();
    },(error) => {
      this.toast.error("Ao adicionar um chamado", "ERROR");
      return throwError(error.error.error);
    });
  }

  findaAllClientes(): void {
    this.clienteService.findAll().subscribe((resposta) => {
        this.clientes = resposta;
      },(error) => {
        this.toast.error("Ao carregar a lista técnico", "ERROR");
        return throwError(error.error.error);
      });
  }

  findAllTecnico(): void {
    this.tecnicoService.findAll().subscribe(
      (resposta) => {
        this.tecnicos = resposta;
      },(error) => {
        this.toast.error("Ao carregar a lista técnico", "ERROR");
        return throwError(error.error.error);
      }
    );
  }

  validaCampos(): boolean {
    return (
      this.prioridade.valid &&
      this.status.valid &&
      this.titulo.valid &&
      this.observacoes.valid &&
      this.tecnico &&
      this.cliente.valid
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



