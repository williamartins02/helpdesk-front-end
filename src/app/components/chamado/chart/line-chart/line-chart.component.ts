import * as moment from "moment";

import { IGraficoChart } from "./../../../../models/chart";
import { ChartService } from "./../../../../services/chart.service";
import { Component, ViewChild } from "@angular/core";
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
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

  private generateChart(data: IGraficoChart[]) {
    const datasList: string[] = [];
    data.forEach(chart => {
      const formatedDate = this.formatDate(chart.dataAbertura);
      datasList.push(formatedDate);
      chart.dataAbertura = formatedDate;
    })

    const datas: Set<string> = new Set(datasList);
    let dados = {};
    datas.forEach(d => {
      const chamadosDoAno = data.filter(chart => chart.dataAbertura === d);
      const baixa     = chamadosDoAno.filter(chart => chart.prioridade === "BAIXA");
      const media     = chamadosDoAno.filter(chart => chart.prioridade === "MEDIA");
      const alta      = chamadosDoAno.filter(chart => chart.prioridade === "ALTA");
      const critica   = chamadosDoAno.filter(chart => chart.prioridade === "CRITICA");
      dados[d] = {
        baixa:    baixa.length,
        media:    media.length,
        alta:     alta.length,  
        critica:  critica.length, 
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
        { data: [], label: "Alta" },
        { data: [], label: "Baixa" },
        { data: [], label: "Média" },
        { data: [], label: "Crítica" },
      ]
    };
    
    Object.keys(this.graphicData).forEach(key => {
      const ano = this.graphicData[key];
      graph.labels.push(key);
      graph.datasets[0].data.push(ano.alta);
      graph.datasets[1].data.push(ano.baixa);
      graph.datasets[2].data.push(ano.media);
      graph.datasets[3].data.push(ano.critica);
    })
    this.barChartData = graph;
  }

//começo do grafico (visual)
  public barChartType: ChartType = "bar";

  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [
      { data: [], label: "Alta" },
      { data: [], label: "Baixa" },
      { data: [], label: "Média" },
      { data: [], label: "Crítica" },
    ],
  };

  public barChartOptions: ChartConfiguration["options"] = {
    elements: {
      line: {
        tension: 0.1,
      },
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0.1,
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
