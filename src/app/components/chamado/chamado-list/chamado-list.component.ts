
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

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.CHAMADO_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number}
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
      height: "1000px",
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  openEdit(id: Number): void {
    console.log("ID", id);
    const dialogRef = this.dialog.open(ChamadoUpdateComponent, {
      width: '600px',
      data: { id }//Pegando ID cliente para editar..
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    }
    return "ALTA";
  }

  /*Retornar cores de FUNDO/TEXTO */
  getColorBackground(prioridade: any) {
    if (prioridade == "0") {
      return "Tomato";
    } else if (prioridade == "1") {
      return "LightSkyBlue";
    }
    return "MediumSeaGreen";
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
}
