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
    // let context = this.chartRef.nativeElement;
    // var context = document.getElementById("tempChart").getContext("2d");
    const context = this.chartRef.nativeElement.getContext("2d");

    if (!context) {
      console.error("Canvas context is null or undefined.");
      return;
    }
    var gradientStroke = context.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#f49080");

    var gradientFill = context.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
    gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");

    this.chart = new Chart(context, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            borderColor: gradientStroke,
            // pointBorderColor: gradientStroke,
            // pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 0,
            pointHoverRadius: 10,
            // pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 4,
            // borderColor: this.createGradient(context, ["blue", "cyan"]),
            // fill: false,
            // // backgroundColor: gradient,
            // pointRadius: 0,
            // pointHoverRadius: 0,
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
