import { ToastrService } from 'ngx-toastr';
import { Tecnico } from './../../../models/tecnico';
import { TecnicoService } from './../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';
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
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute, //permite de um GET em parametros pela url para pegar paramentros 

  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');//acessa a url pega o ID (Parametro)) 
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe((resposta) => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }

  update(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Atualizado com sucesso', 'Técnico(a) ' + this.tecnico.nome);
      this.router.navigate(['tecnicos']);
    }, (err) => {
      if (err.error.errors)
        err.error.errors.forEach((element) => {
          this.toast.error(element.message);
        });
      this.toast.error(err.error.message)
    })
  }

  addPerfil(perfil: any): void {
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    }
    this.tecnico.perfis.push(perfil);
  }

}