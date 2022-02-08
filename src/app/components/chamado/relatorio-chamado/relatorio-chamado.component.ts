import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { Report } from './../../../models/report';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RelatorioService } from './../../../services/relatorio.service';

import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-relatorio-chamado',
  templateUrl: './relatorio-chamado.component.html',
  styleUrls: ['./relatorio-chamado.component.css']
})
export class RelatorioChamadoComponent implements OnInit {


  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;
  constructor(
    private relatorioService: RelatorioService,
    public dialogRef: MatDialogRef<RelatorioChamadoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Report,
  ) { 
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {
    this.imprimiRelatorio();
    //this.matDialogRef = this.genericDialog.loadingMessage("Carregando relatorio...");
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
