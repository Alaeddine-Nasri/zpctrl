import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { LightModele } from "../modeles/light-modele";
import Chart from "chart.js/auto";

@Component({
  selector: "app-light-chart",
  templateUrl: "./light-chart.component.html",
  styleUrls: ["./light-chart.component.css"],
})
export class LightChartComponent implements OnInit {
  @ViewChild("myChart", { static: true }) private chartRef: ElementRef;
  public chart: any;
  public lightData: LightModele[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.sessions.subscribe((sessions) => {
      if (sessions) {
        this.lightData = sessions[2]; // Assuming the LightModele data is at index 2
        const labels = this.lightData.map((data) => data.creationDate);
        const lightValues = this.lightData.map((data) => data.light);
        this.updateChart(labels, lightValues);
      }
    });

    this.apiService.makeApiCalls();
  }

  updateChart(labels: number[], lightValues: number[]): void {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = lightValues;
      this.chart.update();
    } else {
      this.createChart(labels, lightValues);
    }
  }

  createChart(labels: number[], lightValues: number[]) {
    let context = this.chartRef.nativeElement;
    this.chart = new Chart(context, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Light",
            data: lightValues,
            borderColor: "#FFE3C5",
            backgroundColor: "#FFE3C5",
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        elements: {
          line: {
            tension: 0.6,
          },
        },
      },
    });
  }
}
