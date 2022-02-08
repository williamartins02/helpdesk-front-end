import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
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
    prioridade:    '',
    classificacao: '',
    status:        '',
    titulo:        '',
    observacoes:   '',
    tecnico:       '',
    cliente:       '',
    nomeCliente:   '',
    nomeTecnico:   '',
  }
 
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];


  prioridade:    FormControl = new FormControl(null, [Validators.required]);
  status:        FormControl = new FormControl(null, [Validators.required]);
  classificacao: FormControl = new FormControl(null, [Validators.required]);
  titulo:        FormControl = new FormControl(null, [Validators.required]);
  observacoes:   FormControl = new FormControl(null, [Validators.required]);
  tecnico:       FormControl = new FormControl(null, [Validators.required]);
  cliente:       FormControl = new FormControl(null, [Validators.required]);

  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,

    public dialogRef: MatDialogRef<ChamadoUpdateComponent>,
    public dialog: MatDialog
    
  ) {
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');//passando id para o editar via url
    this.findaAllClientes();
    this.findAllTecnico();
    this.findById();
  }

  findById(): void{
    this.chamadoService.findById(this.data.id).subscribe((resposta) =>{
      this.chamado = resposta;
    },(error) => {
      this.toast.error("ao chamar Tecnico ID", "ERROR");
      return throwError(error.error.error);
    })
  }

  update(): void{
    this.onNoClick();
    const matDialogRef = this.genericDialog.loadingMessage("Editando Chamado...");
     this.chamadoService.update(this.chamado).subscribe(() =>{
      setTimeout(() => {
        matDialogRef.close();
        this.toast.success("Edita com sucesso", "Chamado Cliente  " + this.chamado.nomeCliente);
        this.router.navigate(['chamados']);
      },1000)
    },(error) => {
      matDialogRef.close();
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

  /**Retornando status como string*/
  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else if(prioridade == '2') {
      return 'ALTA'
    }
    return "CRITICA"
  }

  retornaClassificacao(classificacao: any): string {
    if (classificacao == "0") {
      return "HARDWARE";
    } else if (classificacao == "1") {
      return "SOFTWARE";
    } else if(classificacao == "2"){
      return "REDES";
    } 
      return "BANCO";
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



