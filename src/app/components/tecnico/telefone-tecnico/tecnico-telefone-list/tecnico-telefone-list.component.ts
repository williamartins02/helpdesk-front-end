import { Inject } from '@angular/core';
import { Tecnico } from './../../../../models/tecnico';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { throwError, Subscription } from 'rxjs';
import { Telefone } from './../../../../models/telefone';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TelefoneService } from 'src/app/services/telefone.service';
import { TecnicoTelefoneCreateComponent } from '../tecnico-telefone-create/tecnico-telefone-create.component';

@Component({
  selector: 'app-tecnico-telefone-list',
  templateUrl: './tecnico-telefone-list.component.html',
  styleUrls: ['./tecnico-telefone-list.component.css']
})
export class TecnicoTelefoneListComponent implements OnInit {

  refreshTable: Subscription;
  isLoading = false;
  telefone: Telefone = {
    id:           '',
    numero:       '',
    tecnico:      '',
    tipoTelefone: '',
    nomeTecnico:  '',
  }
  tecnicos: Tecnico[] = [];
  TELEFONE_DATA: Telefone[] = [];
  displayedColumns: string[] = ['id', 'tipoTelefone', 'numero', 'tecnico', 'acoes'];
  dataSource = new MatTableDataSource<Telefone>(this.TELEFONE_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<TecnicoTelefoneListComponent>,
    private service: TelefoneService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //this.findById();
    this.findByTecnicoId();
    this.refresh();
  }


    /*METODO Criando um service para lista uma LIST TECNICO-TELEFONE*/
  findByTecnicoId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe(resposta => {
      this.TELEFONE_DATA = resposta
      this.dataSource = new MatTableDataSource<Telefone>(resposta);
      this.dataSource.paginator = this.paginator;
    })
  }
  /*Destruindo uma sessão */
  ngOnDestroy(): void {
    this.refreshTable.unsubscribe();
  }
  /*Dando refresh na LIST ao ADICIONAR/EDITAR um usúario, passando um LOADING */
  refresh() {
    this.refreshTable = this.service.refresh$.subscribe(() => {
      this.isLoading = true;
      this.findByTecnicoId();

      setTimeout(() => {
        this.isLoading = false;
      }, 900);
    }, (error) => {
      this.toast.error('Ao carregar a lista', 'ERROR')
      return throwError(error);
    })
  }

  returnTipoTel(status: any): string {
    if (status == "0") {
      return "CASA";
    } else if (status == "1") {
      return "EMPRESA";
    }
    return "CELULAR";
  }
  
  /*Metodo para filtrar*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*MODAL para EDIATR/CRIAR/DELETAR do tecnico-update/tecnico-create/tecnico-delete */
  openCreate(): void {
    const dialogRef = this.dialog.open(TecnicoTelefoneCreateComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getColor(status: any) {
    if (status == "0") {
      return "DarkSlateBlue";
    } else if (status == "1") {
      return "Maroon";
    }return "DarkOliveGreen";
  }

}


