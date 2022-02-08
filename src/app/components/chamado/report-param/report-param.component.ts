import { FormControl, Validators } from '@angular/forms';
import { Report } from './../../../models/report';
import { RelatorioChamadoComponent } from './../relatorio-chamado/relatorio-chamado.component';
import { Component, OnInit,  } from '@angular/core';
import { MatDialog, MatDialogRef,  } from '@angular/material/dialog';

@Component({
  selector: 'app-report-param',
  templateUrl: './report-param.component.html',
  styleUrls: ['./report-param.component.css']
})
export class ReportParamComponent {

  userReport: Report = {
    dataInicio:  '',
    dataFim:     '',
  }

  dataInicio:  FormControl = new FormControl(null, [Validators.required]);
  dataFim:     FormControl = new FormControl(null, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ReportParamComponent>,
    public dialog: MatDialog,
  ) { }

    imprimeRelatorio(): void {
      const dialogRef = this.dialog.open(RelatorioChamadoComponent, {
        height: "90%", width:"90%",
        data: {
          dataInicio: this.dataInicio.value,
          dataFim: this.dataFim.value
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    validaCampos(): boolean {
      return (
        this.dataInicio.valid && this.dataFim.valid
      );
    }
  }




