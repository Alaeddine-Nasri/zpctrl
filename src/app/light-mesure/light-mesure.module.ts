// light-mesure/light-mesure.module.ts
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApiService } from "../api.service";
import { LightMesureComponent } from "./light-mesure.component";

@NgModule({
  declarations: [LightMesureComponent],
  imports: [CommonModule],
  providers: [ApiService],
  exports: [LightMesureComponent], // Export the component for external use
})
export class LightMesureModule {}
