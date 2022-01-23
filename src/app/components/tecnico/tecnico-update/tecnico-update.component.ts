import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from '../../../models/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
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
    public dialogRef: MatDialogRef<TecnicoUpdateComponent>,
    private service: TecnicoService,
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
      this.tecnico = resposta;
    })
  }
  
  update(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Atualizado com sucesso', 'Técnico(a) ' + this.tecnico.nome);
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

  checkPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }
    this.tecnico.perfis.push(perfil);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
