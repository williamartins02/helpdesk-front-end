
import { GenericDialog } from './../../../models/dialog/generic-dialog/generic-dialog';
import { GenericDialogComponent } from './../../molecules/generic-dialog/generic-dialog.component';
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

  private genericDialog: GenericDialog;
  private matDialogRef: MatDialogRef<GenericDialogComponent>;
  
  constructor(
    public dialogRef: MatDialogRef<TecnicoListComponent>,
    private service:  TecnicoService,
    private toast:    ToastrService,
    private router:   Router,
    public dialog:    MatDialog,
  ) {
    this.genericDialog = new GenericDialog(dialog);
   }

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
        }, 1000);
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

    delete(id: number): void { 
      const deleteDialogRef = this.genericDialog.deleteWarningMessage();
      deleteDialogRef.afterClosed().subscribe(deleteConfirmation => {
          if(!deleteConfirmation) {
            return;
          }
        const matDialogRef = this.genericDialog.loadingMessage("Deletando Técnico...");
        this.service.delete(id).subscribe(() => {
            setTimeout(() => {
              matDialogRef.close();
              this.toast.success('Deletado com sucesso', 'Técnico ' + this.tecnico.nome);
              this.router.navigate(['/tecnicos']);
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

  /*MODAL para EDIATR/CRIAR/DELETAR do tecnico-update/tecnico-create/tecnico-delete */
  openCreate(): void {
    const dialogRef = this.dialog.open(TecnicoCreateComponent, {
      width: '600px'
    });
  }

  openEdit(id: Number): void {
    const dialogRef = this.dialog.open(TecnicoUpdateComponent, {
      width: '600px',
      data: { id }//Pegando ID tecnico para editar..
    });
  }
}


