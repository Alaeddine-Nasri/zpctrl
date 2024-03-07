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
  public latestTemperature: number = 0;

  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.sessions.subscribe((sessions) => {
      if (sessions) {
        const environmentData: EnvironmentModele[] = sessions[1];
        const labels = environmentData.map((data) => data.creationDate);
        const temperatures = environmentData.map((data) => data.temperature);
        this.latestTemperature = temperatures[temperatures.length - 1];
        this.updateChart(labels, temperatures);
      }
    });

    this.apiService.makeApiCalls();
  }

  updateChart(labels: number[], temperatures: number[]): void {
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = temperatures;
      this.latestTemperature = temperatures[temperatures.length - 1];
      this.chart.update();
    } else {
      this.createChart(labels, temperatures);
    }
  }
  createChart(labels: number[], temperatures: number[]) {
    let context = this.chartRef.nativeElement;
    const gradient = this.createGradient(context, ["#FFE3C5", "#C1F0EA"]);
    this.chart = new Chart(context, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            borderColor: this.createGradient(context, ["blue", "cyan"]),
            fill: false,
            backgroundColor: gradient,
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
  createGradient(
    context: CanvasRenderingContext2D,
    colors: string[]
  ): CanvasGradient {
    const gradient = this.chartRef.nativeElement
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 1);
    gradient.addColorStop(0, "rgba(193, 240, 234, 1)");
    gradient.addColorStop(1, "rgba(193, 240, 234, 1)");

    return gradient;
  }
}
