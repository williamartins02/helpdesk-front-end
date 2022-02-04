import { FormControl, FormGroup } from '@angular/forms';
import { ReportParamComponent } from './../report-param/report-param.component';

import { ToastrService } from 'ngx-toastr';
import { Subscription, throwError } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChamadoCreateComponent } from "./../chamado-create/chamado-create.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Chamado } from "./../../../models/chamado";
import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ChamadoService } from "src/app/services/chamado.service";
import { ChamadoUpdateComponent } from '../chamado-update/chamado-update.component';
import { ChamadoReadComponent } from '../chamado-read/chamado-read.component';

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {

  CHAMADO_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];
  refreshTable: Subscription;
  isLoading = false;

  formGroup: FormGroup;

  displayedColumns: string[] = ['id', 'titulo', 'classificacao', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status','acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.CHAMADO_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number, string: Text}
  constructor(
    public dialog: MatDialog, 
    private service: ChamadoService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<ChamadoListComponent>,
    ) {}

  ngOnInit(): void {
    this.findAll();
    this.refresh();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.CHAMADO_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      this.toast.error('Na listagem de chamado, procurar suporte', 'ERROR')
      return throwError(error.error.error);
    });
  }

  /*Destruindo uma sessão */
  ngOnDestroy(): void {
    this.refreshTable.unsubscribe();
  }
  /*Dando refresh na LIST ao ADICIONAR/EDITAR um usúario, passando um LOADING */
  refresh() {
    this.refreshTable = this.service.refresh$.subscribe(() => {
      this.isLoading = true;
      this.findAll();

      setTimeout(() => {
        this.isLoading = false;
      }, 900);
    }, (error) => {
      this.toast.error('Ao carregar a lista', 'ERROR')
      return throwError(error);
    })
  }

  openCreate(): void {
    const dialogRef = this.dialog.open(ChamadoCreateComponent, {
      height: "799px",
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  reportParame(): void {
    const dialogRef = this.dialog.open(ReportParamComponent, {
      width: "729px", height: "310px",
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEdit(id: Number): void {
    const dialogRef = this.dialog.open(ChamadoUpdateComponent, {
      data: { id }//Pegando ID cliente para editar..
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openRed(id: Number): void {
    const dialogRef = this.dialog.open(ChamadoReadComponent, {
      height: "790px",
      data: { id }//Pegando ID cliente para editar..
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /**Retornando status como string*/
  returnStatus(status: any): string {
    if (status == "0") {
      return "ABERTO";
    } else if (status == "1") {
      return "EM ANDAMENTO";
    }
    return "ENCERRADO";
  }

  returnPrioridade(prioridade: any): string {
    if (prioridade == "0") {
      return "BAIXA";
    } else if (prioridade == "1") {
      return "MÉDIA";
    } else if(prioridade == "2") {
      return "ALTA";
    }else{
    return "CRITICA";
    }
  }

  returnClassificacao(classificacao: any): string {
    if (classificacao == "0") {
      return "HARDWARE";
    } else if (classificacao == "1") {
      return "SOFTWARE";
    }else if(classificacao == "2"){
      return "REDES";
    }else{
    return "BANCO";
    }
  }

  /*Retornar cores de FUNDO/TEXTO */
  getColorBackground(prioridade: any) {
    if (prioridade == "0") {
      return "Tomato";
    } else if (prioridade == "1") {
      return "LightSkyBlue";
    }else if (prioridade == "2"){
      return "MediumSeaGreen";
    }else{
    return "black";
    }
  }

  getColor(status: any) {
    if (status == "0") {
      return "LimeGreen";
    } else if (status == "1") {
      return "Gold";
    }
    return "Tomato";
  }


  /*Listando a list por ordem de chamado.*/
  orderByStatus(status: any): void {
    let list: Chamado[] = [];
    this.CHAMADO_DATA.forEach((element) => {
      if (element.status == status) 
          list.push(element);
    });

    /*Trazendo a list filtrada em sintonia com o pagination*/
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
  }

  /*Metodo para filtrar*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
