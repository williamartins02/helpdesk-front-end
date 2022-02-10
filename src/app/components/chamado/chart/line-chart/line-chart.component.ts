import * as moment from "moment";

import { UserChart, IGraficoChart } from "./../../../../models/chart";
import { ChartService } from "./../../../../services/chart.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
} from "chart.js";
import { BaseChartDirective } from "ng2-charts";


@Component({
  selector: "app-dynamic-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  userChart: IGraficoChart[] = []

  graphicData;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.carregaGrafico();
  }

  carregaGrafico() {
    this.chartService.carregarGrafico().subscribe((res) => {
      this.graphicData = this.generateChart(res);
      this.generateGraph();
    });
  }

  public barChartType: ChartType = "bar";

  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [
      { data: [], label: "Aberto" },
      { data: [], label: "Em Andamento" },
      { data: [], label: "Encerrado" },
    ],
  };

  private generateChart(data: IGraficoChart[]) {
    const datasList: string[] = [];
    data.forEach(chart => {
      const formatedDate = this.formatDate(chart.dataAbertura);
      datasList.push(formatedDate);
      chart.dataAbertura = formatedDate;
    }
    )

    const datas: Set<string> = new Set(datasList);
    let dados = {};
    datas.forEach(d => {
      const chamadosDoAno = data.filter(chart => chart.dataAbertura === d);

      const abertos = chamadosDoAno.filter(chart => chart.status === "ABERTO");
      const emAndamento = chamadosDoAno.filter(chart => chart.status === "ANDAMENTO");
      const encerrados = chamadosDoAno.filter(chart => chart.status === "ENCERRADO");
      dados[d] = {
        abertos: abertos.length,
        emAndamento: emAndamento.length,
        encerrados: encerrados.length  
      }
    })

    return dados;
  }

  private formatDate(data: string): string {
    const firstPart = data.split('/', 3)[2];
    return firstPart.split(" ")[0];
  }

  private generateGraph() {
    let graph = {
      labels: [],
      datasets: [
        { data: [], label: "Aberto" },
        { data: [], label: "Em Andamento" },
        { data: [], label: "Encerrado" },
      ]
    };
    
    Object.keys(this.graphicData).forEach(key => {
      const ano = this.graphicData[key];
      graph.labels.push(key);
      graph.datasets[0].data.push(ano.abertos);
      graph.datasets[1].data.push(ano.emAndamento);
      graph.datasets[2].data.push(ano.encerrados);
    })
    this.barChartData = graph;
  }



  public barChartOptions: ChartConfiguration["options"] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { display: true },
    },
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    // console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === "bar" ? "line" : "bar";
  }
}
