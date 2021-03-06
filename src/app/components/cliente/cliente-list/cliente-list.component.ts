import { ClienteService } from './../../../services/cliente.service';
import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { Cliente } from './../../../models/cliente';


import { Router } from '@angular/router';

import { ClienteUpdateComponent } from '../cliente-update/cliente-update.component';
import { Subscription, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Component, OnDestroy, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteCreateComponent } from '../cliente-create/cliente-create.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit  {

  /*Scrooll da tabela */
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  //refresh
  refreshTable: Subscription;
  isLoading = false;
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  }
 
  CLIENTE_DATA: Cliente[] = [];
  //injetando o ID para abrir no modal
  @Inject(MAT_DIALOG_DATA) public data: {id: Number}
  //informaçoes da tabela (COLUNNAS)
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Cliente>(this.CLIENTE_DATA);
  /*Paninação da tabela cliente*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;
  constructor(
    public  dialogRef: MatDialogRef<ClienteListComponent>,
    private service:   ClienteService,
    private toast:     ToastrService,
    public  dialog:    MatDialog,
    private router:    Router,

  ) {
    this.genericDialog = new GenericDialog(dialog);
  }

  ngOnInit(): void {
    this.findAll();
    this.refresh();
  }

  /*Destruindo uma sessão, renovando para da um refresh */
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
      this.cliente = resposta;
    })
  }

  /*METODO Criando um service para lista uma LIST TECNICO*/
  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.CLIENTE_DATA = resposta
      this.dataSource = new MatTableDataSource<Cliente>(resposta);
      this.dataSource.paginator = this.paginator;//paginação dos registros. 
    }, (error) => {
      this.toast.error('Na listagem dos clientes, procurar suporte', 'ERROR')
      return throwError(error);
    })
  }

  delete(id: number): void { 
    const deleteDialogRef = this.genericDialog.deleteWarningMessage();
    deleteDialogRef.afterClosed().subscribe(deleteConfirmation => {
        if(!deleteConfirmation) {
          return;
        }
      const matDialogRef = this.genericDialog.loadingMessage("Deletando Cliente...");
      this.service.delete(id).subscribe(() => {
          setTimeout(() => {
            matDialogRef.close();
            this.toast.success('Deletado com sucesso', 'Cliente ' + this.cliente.nome);
            this.router.navigate(['/clientes']);
          },1000)
      }, (err) => {
        matDialogRef.close();
          if (err.error.errors)
            err.error.errors.forEach((element) => {
              this.toast.error(element.message);
            });
        this.toast.error(err.error.message)
      })
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  /*Metodo para filtrar*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*MODAL para EDIATR/CRIAR/DELETAR do cliente-update/cliente-create/cliente-delete */
  openCreate(): void {
    const dialogRef = this.dialog.open(ClienteCreateComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEdit(id: Number): void {
    const dialogRef = this.dialog.open(ClienteUpdateComponent, {
      width: '600px',
      data: { id }//Pegando ID cliente para editar..
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


