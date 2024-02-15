import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { LightModele } from "./modeles/light-modele";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiUrl =
    "https://octave-api.sierrawireless.io/v5.0/dora_ala/event/s655b35b96bf1084309e9bb35";
  private authToken = "8G1LTejFJBSQleHSCaqeB7u1TTqt1Jyp";
  private authUser = "ala_eddine_nasri";

  constructor(private http: HttpClient) {}
  private sessionsSubject = new BehaviorSubject<LightModele[] | undefined>(
    undefined
  );
  public sessions = this.sessionsSubject.asObservable();
  makeApiCall(): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-Auth-Token": this.authToken,
      "X-Auth-User": this.authUser,
    });

    return this.http.get(this.apiUrl, { headers });
  }

  processApiResponse(response: any): void {
    if (response && response.body) {
      const lightSessions: LightModele[] = response.body.map((item: any) => {
        const { id, creationDate, elems } = item;
        const light = elems.light;
        return { id, creationDate, light };
      });

      console.log("Light Sessions:", lightSessions);

      this.sessionsSubject.next(lightSessions);
    } else {
      console.error("Invalid API response");
    }
  }
}
