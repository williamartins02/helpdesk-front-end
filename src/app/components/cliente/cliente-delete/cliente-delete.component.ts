import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {


  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }
  isLoading = false;

  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    public dialogRef: MatDialogRef<ClienteDeleteComponent>,
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    public dialog: MatDialog) { 
      this.genericDialog = new GenericDialog(dialog);
    }

    ngOnInit(): void {
      this.findById();
    }

  public closeModal(confirm?: boolean): void{
    this.dialogRef.close(confirm);
  }

  findById(): void {
    this.service.findById(this.data.id).subscribe((resposta) => {
      resposta.perfis = []
      this.cliente = resposta;
    })
  }
  delete(): void {
    this.onNoClick();
    const matDialogRef = this.genericDialog.loadingMessage("Deletando Cliente...");
    this.service.delete(this.cliente.id).subscribe(() => {
      setTimeout(() => {
        matDialogRef.close();
        this.toast.success('Deletado com sucesso', 'Cliente ' + this.cliente.nome);
        this.router.navigate(['/clientes']);
      },1000)
    }, (err) => {//listando LIST de erro.
      matDialogRef.close();
      if (err.error.errors)
        err.error.errors.forEach((element) => {
          this.toast.error(element.message);
        });
      this.toast.error(err.error.message)
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
