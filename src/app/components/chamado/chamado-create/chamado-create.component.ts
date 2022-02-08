import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chamado } from './../../../models/chamado';

import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ChamadoService } from "src/app/services/chamado.service";
import { TecnicoService } from "./../../../services/tecnico.service";
import { ClienteService } from "./../../../services/cliente.service";
import { Tecnico } from "./../../../models/tecnico";
import { Cliente } from "./../../../models/cliente";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-chamado-create",
  templateUrl: "./chamado-create.component.html",
  styleUrls: ["./chamado-create.component.css"],
})
export class ChamadoCreateComponent implements OnInit {
  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;
 
  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    classificacao:'',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];


  prioridade:     FormControl = new FormControl(null, [Validators.required]);
  status:         FormControl = new FormControl(null, [Validators.required]);
  classificacao:  FormControl = new FormControl(null, [Validators.required]);
  titulo:         FormControl = new FormControl(null, [Validators.required]);
  observacoes:    FormControl = new FormControl(null, [Validators.required]);
  tecnico:        FormControl = new FormControl(null, [Validators.required]);
  cliente:        FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private  chamadoService: ChamadoService,
    private  clienteService: ClienteService,
    private  tecnicoService: TecnicoService,
    private  toast: ToastrService,
    private router: Router,
    public  dialogRef: MatDialogRef<ChamadoCreateComponent>,
    public dialog: MatDialog
   
  ) {
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {
    this.findaAllClientes();
    this.findAllTecnico();
  }

  create(): void{
    this.onNoClick();
    const matDialogRef = this.genericDialog.loadingMessage("Salvando Chamado...");
     this.chamadoService.create(this.chamado).subscribe(() =>{
      setTimeout(() => {
        matDialogRef.close();
        this.toast.success("Chamado criando com sucesso", "Novo chamado");
        this.router.navigate(['chamados']);
      },1000)
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
      this.classificacao.valid &&
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
