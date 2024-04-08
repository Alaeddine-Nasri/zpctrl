import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
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
  @Output() latestLightValueChange = new EventEmitter<number>(); // Define output property
  public chart: any;
  public lightData: LightModele[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.sessions.subscribe((sessions) => {
      if (sessions) {
        this.lightData = sessions[2]; // Assuming the LightModele data is at index 2
        const labels = this.lightData.map((data) => data.creationDate);
        const lightValues = this.lightData.map((data) => data.light);
        this.latestLightValueChange.emit(lightValues[lightValues.length - 1]);

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
    // let context = this.chartRef.nativeElement;
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
            label: "Light",
            data: lightValues,
            borderColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 0,
            pointHoverRadius: 10,
            pointRadius: 3,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 4,
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
