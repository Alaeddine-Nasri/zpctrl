import { Component } from "@angular/core";
// import { CommonModule } from "@angular/common";
import { OnInit, ElementRef, ViewChild } from "@angular/core";
import Chart from "chart.js/auto";

@Component({
  selector: "app-temperature-chart",
  templateUrl: "./temperature-chart.component.html",
  styleUrls: ["./temperature-chart.component.css"],
})
export class TemperatureChartComponent implements OnInit {
  @ViewChild("tempChart", { static: true }) private chartRef: ElementRef;

  public chart: any;

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    let context = this.chartRef.nativeElement;
    this.chart = new Chart(context, {
      type: "bar", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          "2022-05-10",
          "2022-05-11",
          "2022-05-12",
          "2022-05-13",
          "2022-05-14",
          "2022-05-15",
          "2022-05-16",
          "2022-05-17",
        ],
        datasets: [
          {
            label: "Sales",
            data: ["467", "576", "572", "79", "92", "574", "573", "576"],
            backgroundColor: "blue",
          },
          {
            label: "Profit",
            data: ["542", "542", "536", "327", "17", "0.00", "538", "541"],
            backgroundColor: "limegreen",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
