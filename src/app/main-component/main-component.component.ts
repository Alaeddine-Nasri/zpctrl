import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-main-component",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./main-component.component.html",
  styleUrl: "./main-component.component.css",
})
export class MainComponentComponent {
  selectedChart: "temperature" | "line" | "light" | "battery" = "temperature";

  selectChart(chart: "temperature" | "line" | "light" | "battery"): void {
    this.selectedChart = chart;
  }
}
