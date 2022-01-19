import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';


@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  CHAMADO_DATA: Chamado[] = [
    {
      id:                 1,
      dataAbertura:       '19/01/2022',
      dataFechamento:     '19/01/2022',
      prioridade:          'ALTA',
      status:              'ANDAMENTO',
      titulo:              'PRIMEIRO CHAMADO',
      descricao:           'TESTE CHAMADO',
      tecnico:             1,
      cliente:             6,
      nomeCliente:         'WILLIAM MARTINS',
      nomeTecnico:         'DAYANE DA SILVA',
    }
  ]
 
  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'status', 'priodirade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>(this.CHAMADO_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }


    /*Metodo para filtrar*/
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
