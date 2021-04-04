import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DialogComponent } from "./dialog.component";

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, OverlayModule],
  exports: [],
})
export class DialogModule {}
