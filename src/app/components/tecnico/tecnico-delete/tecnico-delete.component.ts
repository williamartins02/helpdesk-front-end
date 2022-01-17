import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  TECNICO_DATA: Tecnico[] = [];
  tecnico: Tecnico = {
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
    public dialogRef: MatDialogRef<TecnicoDeleteComponent>,
    private service: TecnicoService,
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
      this.tecnico = resposta;
    })
  }
  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.toast.success('Deletado com sucesso', 'Técnico(a) ' + this.tecnico.nome);
      this.router.navigate(['/tecnicos']);
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
