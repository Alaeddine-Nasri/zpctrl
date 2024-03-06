import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  selectedChart: "temperature" | "line" | "light" | "battery" = "temperature";

  selectChart(chart: "temperature" | "line" | "light" | "battery"): void {
    this.selectedChart = chart;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
