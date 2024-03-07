import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { LightModele } from "./modeles/light-modele";
import { map } from 'rxjs/operators';
import { BatteryModele } from "./modeles/battery-modele";
import { EnvironmentModele } from "./modeles/environment-modele";


@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiBattery =
    "https://octave-api.sierrawireless.io/v5.0/Ala_Dorra/event/s65e8b1d21b58da6946c49788";
  private apiEnvironment =
    "https://octave-api.sierrawireless.io/v5.0/Ala_Dorra/event/s65e8b26ede69b41fe8db4769";
  private apiLight =
    "https://octave-api.sierrawireless.io/v5.0/Ala_Dorra/event/s65e8b18cde69b41fe8db4452";

  //really bad practice but whatever just for a quick one-night-project 
  private authToken = "52GlIcg8yJuZWzSxCoJ08OafBzY5qjo5";
  private authUser = "dorra_gara";

  constructor(private http: HttpClient) {}
  private sessionsSubject = new BehaviorSubject<any[] | undefined>(
    undefined
  );
  public sessions = this.sessionsSubject.asObservable();
  makeApiCalls(): void {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-Auth-Token": this.authToken,
      "X-Auth-User": this.authUser,
    });

    const apiCalls: Observable<any>[] = [
      this.makeApiCall(this.apiBattery, headers).pipe(
        map(response => this.parseBatteryResponse(response.body))
      ),
      this.makeApiCall(this.apiEnvironment, headers).pipe(
        map(response => this.parseEnvironmentResponse(response.body))
      ),
      this.makeApiCall(this.apiLight, headers).pipe(
        map(response => this.parseLightResponse(response.body))
      )
    ];

    forkJoin(apiCalls).subscribe(
      (processedResponses: any[][]) => {
        console.log("Processed Responses:", processedResponses);
        this.sessionsSubject.next(processedResponses);
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }

  private makeApiCall(url: string, headers: HttpHeaders): Observable<any> {
    return this.http.get<any[]>(url, { headers });
  }

  private parseBatteryResponse(response: any[]): BatteryModele[] {
    return response.map((item: any) => {
      return new BatteryModele(
        item.creationDate,
        item.elems.battery.degC,
        item.elems.battery.mA,
        item.elems.battery.mAh,
        item.elems.battery.V,
        item.elems.battery.charging,
        item.elems.battery.health,
        item.elems.battery.percent
      );
    });    
  }

  private parseEnvironmentResponse(response: any[]): EnvironmentModele[] {
    return response.map((item: any) => {
      return new EnvironmentModele(
        item.creationDate,
        item.elems.environment.co2EquivalentAccuracy,
        item.elems.environment.iaqAccuracy,
        item.elems.environment.breathVocValue,
        item.elems.environment.co2EquivalentValue,
        item.elems.environment.temperature,
        item.elems.environment.humidity,
        item.elems.environment.pressure,
        item.elems.environment.iaqValue,
        item.elems.environment.breathVocAccuracy
      )
    });
  }

  private parseLightResponse(response: any[]): LightModele[] {
    return response.map((item: any) => {
      return new LightModele(
        item.creationDate,
        item.elems.light,
      )
    });
  }

}
