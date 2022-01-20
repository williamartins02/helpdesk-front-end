import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Chamado } from "./../../../models/chamado";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChamadoService } from "src/app/services/chamado.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-chamado-list",
  templateUrl: "./chamado-list.component.html",
  styleUrls: ["./chamado-list.component.css"],
})
export class ChamadoListComponent implements OnInit {
  CHAMADO_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ["id","titulo","tecnico","cliente","dataAbertura","prioridade","status","acoes",];
  dataSource = new MatTableDataSource<Chamado>(this.CHAMADO_DATA);
  /*Paninação da tabela tecnico*/
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ChamadoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.CHAMADO_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
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
  getColorBackground(prioridade: any){
    if(prioridade == "0"){
      return 'Tomato'
    } else if (prioridade == "1"){
       return 'LightSkyBlue'
    }
    return 'MediumSeaGreen'
  }
  getColor(status: any){
    if(status == "0"){
      return 'LimeGreen'
    } else if (status == "1"){
       return 'Gold'
    }
    return 'Tomato'
  }
  

  /*Listando a list por ordem de chamado.*/
  orderByStatus(status: any): void{
    let list: Chamado[] = []
    this.CHAMADO_DATA.forEach(element => {
      if(element.status == status)
      list.push(element)
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
