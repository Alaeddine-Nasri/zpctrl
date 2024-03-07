import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { EnvironmentModele } from "../modeles/environment-modele";
import Chart from "chart.js/auto";

@Component({
  selector: "app-temperature-chart",
  templateUrl: "./temperature-chart.component.html",
  styleUrls: ["./temperature-chart.component.css"],
})
export class TemperatureChartComponent implements OnInit {
  @ViewChild("tempChart", { static: true }) private chartRef: ElementRef;
  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.sessions.subscribe((sessions) => {
      if (sessions) {
        // Assuming the second session is the environment data
        const environmentData: EnvironmentModele[] = sessions[1];

        // Extract creation dates and temperatures from the data
        const labels = environmentData.map((data) => data.creationDate);
        const temperatures = environmentData.map((data) => data.temperature);

        // Update the chart with the new data
        this.updateChart(labels, temperatures);
      }
    });

    this.apiService.makeApiCalls();
  }

  updateChart(labels: number[], temperatures: number[]): void {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = temperatures;
      this.chart.update();
    } else {
      this.createChart(labels, temperatures);
    }
  }

  // createChart(labels: number[], temperatures: number[]): void {
  //   const context = document.getElementById("tempChart") as HTMLCanvasElement;
  //   this.chart = new Chart(context, {
  //     type: "line",
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Temperature",
  //           data: temperatures,
  //           borderColor: "blue",
  //           fill: false,
  //         },
  //       ],
  //     },
  //     options: {
  //       aspectRatio: 2.5,
  //     },
  //   });
  // }

  createChart(labels: number[], temperatures: number[]) {
    let context = this.chartRef.nativeElement;
    this.chart = new Chart(context, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            borderColor: "blue",
            fill: false,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
