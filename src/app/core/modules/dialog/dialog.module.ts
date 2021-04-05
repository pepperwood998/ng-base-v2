import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogComponent } from "./dialog.component";

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [],
})
export class DialogModule {}
