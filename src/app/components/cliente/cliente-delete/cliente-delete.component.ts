import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  TECNICO_DATA: Cliente[] = [];
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    public dialogRef: MatDialogRef<ClienteDeleteComponent>,
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,) { }

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
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Deletado com sucesso', 'Cliente ' + this.cliente.nome);
      this.router.navigate(['/clientes']);
      this.onNoClick();
    }, (err) => {//listando LIST de erro.
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
