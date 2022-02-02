import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { Chamado } from "./../../../models/chamado";

import { throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ChamadoService } from "src/app/services/chamado.service";
import { ChamadoUpdateComponent } from "src/app/components/chamado/chamado-update/chamado-update.component";

@Component({
  selector: "app-chamado-read",
  templateUrl: "./chamado-read.component.html",
  styleUrls: ["./chamado-read.component.css"],
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade:   '',
    status:       '',
    classificacao:'',
    titulo:       '',
    observacoes:  '',
    tecnico:      '',
    cliente:      '',
    nomeCliente:  '',
    nomeTecnico:  '',
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: Number },

    private chamadoService: ChamadoService,
    private toast: ToastrService,
    private route: ActivatedRoute,

    public dialogRef: MatDialogRef<ChamadoReadComponent>
  ) {}

  ngOnInit(): void {
    this.routeIdUrl();
    this.findById();
  }

  routeIdUrl(): void {
    this.chamado.id = this.route.snapshot.paramMap.get("id"); //passando id para o editar via url
  }

  findById(): void {
    this.chamadoService.findById(this.data.id).subscribe((resposta) => {
        this.chamado = resposta;
      },(error) => {
          this.toast.error("ao chamar Tecnico ID", "ERROR");
          return throwError(error.error.error);
        }
    );
  }

  /**Retornando status como string*/
  retornaStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    } else {
      return "ENCERRADO";
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else if(prioridade == "2") {
      return "ALTA";
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

  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
