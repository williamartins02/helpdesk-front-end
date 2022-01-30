import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelatorioService } from './../../../services/relatorio.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-relatorio-chamado',
  templateUrl: './relatorio-chamado.component.html',
  styleUrls: ['./relatorio-chamado.component.css']
})
export class RelatorioChamadoComponent implements OnInit {

  constructor(
    private relatortioService: RelatorioService,
  ) { }

  ngOnInit(): void {
    this.imprimeReport();
  }

  imprimeReport(): void{
    this.relatortioService.downloadPdfRelatorio();
  }
}
