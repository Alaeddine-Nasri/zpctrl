import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { LightModele } from "../modeles/light-modele";

@Component({
  selector: "app-light-mesurement",
  templateUrl: "./light-mesurement.component.html",
  styleUrl: "./light-mesurement.component.css",
})
export class LightMesurementComponent implements OnInit {
  lightValues: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   /* this.apiService.makeApiCalls().subscribe(
      (response) => {
        this.apiService.processApiResponse(response);
        this.updateLightValues();
      },
      (error) => {
        console.error("API Call Error:", error);
      }
    );*/
    this.apiService.makeApiCalls();
  }

  //   private updateLightValues(): void {
  //   this.apiService.sessions.subscribe(
  //     (lightValues: LightModele[] | undefined) => {
  //       if (lightValues) {
  //         // Assuming you want to display all the properties in your component
  //         this.lightValues = lightValues.map(
  //           (session) => `ID: ${session.id}, Date: ${session.creationDate}, Light: ${session.light}`
  //         );
  //       }
  //     }
  //   );
  // }

  private updateLightValues(): void {
    this.apiService.sessions.subscribe(
      (lightValues: LightModele[] | undefined) => {
        if (lightValues) {
          this.lightValues = lightValues.map((session) => session.light);
        }
      }
    );
  }
}
