import { Router } from '@angular/router';
import { TecnicoUpdateComponent } from './../tecnico-update/tecnico-update.component';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TecnicoService } from './../../../services/tecnico.service';
import { Tecnico } from './../../../models/tecnico';
import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TecnicoCreateComponent } from '../tecnico-create/tecnico-create.component';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    public dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
    this.findAll();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TecnicoCreateComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  /*METODO Criando um service para lista uma LIST TECNICO*/
  findAll() {
    this.service.findAll().subscribe((resposta) => {
        this.ELEMENT_DATA = resposta
        this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
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
}

