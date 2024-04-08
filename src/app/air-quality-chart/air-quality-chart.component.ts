import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { EnvironmentModele } from "../modeles/environment-modele";
import { ApiService } from "../api.service";
import Chart from "chart.js/auto";

@Component({
  selector: "app-air-quality-chart",
  templateUrl: "./air-quality-chart.component.html",
  styleUrls: ["./air-quality-chart.component.css"], // Use styleUrls instead of styleUrl
})
export class AirQualityChartComponent implements OnInit {
  @ViewChild("airChart", { static: true }) private chartRef: ElementRef;
  @Output() latestTemperatureChange = new EventEmitter<number>();
  public latestTemperature: number = 0;

  public chart: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.sessions.subscribe((sessions) => {
      if (sessions) {
        const environmentData: EnvironmentModele[] = sessions[1];
        const labels = environmentData.map((data) => data.creationDate);
        const temperatures = environmentData.map((data) => data.temperature);
        // const last_temperature = temperatures[temperatures.length - 1];
        this.latestTemperature = temperatures[temperatures.length - 1];
        this.latestTemperatureChange.emit(this.latestTemperature);
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
    // var context = document.getElementById("airChart").getContext("2d");
    const context = this.chartRef.nativeElement.getContext("2d");

    if (!context) {
      console.error("Canvas context is null or undefined.");
      return;
    }
    var gradientStroke = context.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, "#80b6f4");
    gradientStroke.addColorStop(1, "#f49080");

    var gradientFill = context.createLinearGradient(500, 0, 100, 0);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.3)");
    gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.3)");

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
