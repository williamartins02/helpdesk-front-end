import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }

  /*Validação usando o FormControl*/
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: Number},
    public dialogRef: MatDialogRef<ClienteUpdateComponent>,
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute, //permite de um GET em parametros pela url para pegar paramentros 

  ) { }

  ngOnInit(): void {
    this.findById();
  }

  findById(): void {
    this.service.findById(this.data.id).subscribe((resposta) => {
      resposta.perfis = []
      this.cliente = resposta;
    })
  }
  
  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toast.success('Atualizado com sucesso', 'Cliente ' + this.cliente.nome);
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

  checkPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    }
    this.cliente.perfis.push(perfil);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
