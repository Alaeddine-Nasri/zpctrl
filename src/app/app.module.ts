import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductAlertsComponent } from "./product-alerts/product-alerts.component";
// import { LightMesurementComponent } from "./light-mesurement/light-mesurement.component";
import { HttpClientModule } from "@angular/common/http";
import { LightChartComponent } from "./light-chart/light-chart.component";
import { TemperatureChartComponent } from "./temperature-chart/temperature-chart.component";
import { ProfileSidebarModule } from "./profile-sidebar/profile-sidebar.module";
import { DetailsRightbarComponent } from "./details-rightbar/details-rightbar.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: "", component: ProductListComponent }]),
    ProfileSidebarModule,
    DetailsRightbarComponent,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    // LightMesurementComponent,
    LightChartComponent,
    TemperatureChartComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
