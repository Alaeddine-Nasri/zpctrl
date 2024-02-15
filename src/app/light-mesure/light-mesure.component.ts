// light-mesure/light-mesure.component.ts
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-light-mesure",
  template: `
    <div>
      <h2>Light Measurement Component</h2>
      <p>API Response: {{ apiResponse | json }}</p>
    </div>
  `,
})
export class LightMesureComponent implements OnInit {
  apiResponse: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.makeApiCall().subscribe(
      (response) => {
        console.log("API Response:", response);
        this.apiResponse = response;
      },
      (error) => {
        console.error("API Error:", error);
        // Handle errors as needed
      }
    );
  }
}
