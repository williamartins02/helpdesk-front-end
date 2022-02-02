import { Report } from './../../../models/report';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelatorioService } from './../../../services/relatorio.service';

import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-relatorio-chamado',
  templateUrl: './relatorio-chamado.component.html',
  styleUrls: ['./relatorio-chamado.component.css']
})
export class RelatorioChamadoComponent implements OnInit {

  constructor(
    private relatorioService: RelatorioService,
    public dialogRef: MatDialogRef<RelatorioChamadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report,
  ) { }

  ngOnInit(): void {
   this.imprimiRelatorio();
  }

  imprimiRelatorio(){
    this.relatorioService.downloadPdfRelatorioParam(this.data);
  }
  //imprimeReport(): void{
    //this.relatortioService.downloadPdfRelatorio();
  //}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
