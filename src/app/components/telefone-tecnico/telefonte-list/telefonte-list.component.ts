import { Component, OnInit, Inject, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { Subscription, throwError } from 'rxjs';

import { Telefone } from 'src/app/models/telefone';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TelefoneService } from 'src/app/services/telefone.service';
import { ToastrService } from 'ngx-toastr';
import { TelefoneCreateComponent } from '../telefone-create/telefone-create.component';


@Component({
  selector: 'app-telefonte-list',
  templateUrl: './telefonte-list.component.html',
  styleUrls: ['./telefonte-list.component.css']
})
export class TelefoneListComponent implements OnInit {


    items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);//scroll
  
    refreshTable: Subscription;
    
    isLoading = false;
    telefone: Telefone = {
      id: '',
      numero: '',
      tipoTelefone: '',
      tecnico: '',
    }
   
    TELEFONE_DATA: Telefone[] = [];
    @Inject(MAT_DIALOG_DATA) public data: {id: Number}
    displayedColumns: string[] = ['id', 'numero', 'tipoTelefone', 'tecnico', 'acoes'];
    dataSource = new MatTableDataSource<Telefone>(this.TELEFONE_DATA);
    /*Paninação da tabela tecnico*/
    @ViewChild(MatPaginator) paginator: MatPaginator;
  
    constructor(
      public dialogRef: MatDialogRef<TelefoneListComponent>,
      private service: TelefoneService,
      private toast: ToastrService,
      public dialog: MatDialog,
      
  
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
  
    /*METODO Criando um service para lista uma LIST TECNICO*/
    findAll() {
      this.service.findAll().subscribe((resposta) => {
        this.TELEFONE_DATA = resposta
        this.dataSource = new MatTableDataSource<Telefone>(this.TELEFONE_DATA);
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
      const dialogRef = this.dialog.open(TelefoneCreateComponent, {
        width: '600px'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }
  