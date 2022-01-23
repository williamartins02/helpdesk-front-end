import { TecnicoDeleteComponent } from './../tecnico-delete/tecnico-delete.component';
import { Router } from '@angular/router';


import { Subscription, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TecnicoCreateComponent } from '../tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from '../tecnico-update/tecnico-update.component';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit, OnDestroy {

  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);//scroll

 
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }
  refreshTable: Subscription;

  isLoading = false;
  TECNICO_DATA: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.TECNICO_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Inject(MAT_DIALOG_DATA) public data: {id: Number}
  constructor(
    public dialogRef: MatDialogRef<TecnicoListComponent>,
    private service: TecnicoService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.findAll();
    this.refresh();
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

  findById(): void {
    this.service.findById(this.data.id).subscribe((resposta) => {
      resposta.perfis = []
      this.tecnico = resposta;
    })
  }

  /*METODO Criando um service para lista uma LIST TECNICO*/
  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.TECNICO_DATA = resposta
      this.dataSource = new MatTableDataSource<Tecnico>(this.TECNICO_DATA);
      this.dataSource.paginator = this.paginator;//paginação dos registros. 
    }, (error) => {
      this.toast.error('Na listagem dos tecnicos, procurar suporte', 'ERROR')
      return throwError(error);
    })
  }
  
  /*Metodo para filtrar*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*MODAL para EDIATR/CRIAR/DELETAR do tecnico-update/tecnico-create/tecnico-delete */
  openCreate(): void {
    const dialogRef = this.dialog.open(TecnicoCreateComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEdit(id: Number): void {
    console.log("ID", id);
    const dialogRef = this.dialog.open(TecnicoUpdateComponent, {
      width: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDelete(id: Number): void {
    console.log("ID", id);
    const dialogRef = this.dialog.open(TecnicoDeleteComponent, {
      width: '600px',
      data: { id }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


