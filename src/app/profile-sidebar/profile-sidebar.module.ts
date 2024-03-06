import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileSidebarComponent } from "./profile-sidebar.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [ProfileSidebarComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ProfileSidebarComponent],
})
export class ProfileSidebarModule {}
