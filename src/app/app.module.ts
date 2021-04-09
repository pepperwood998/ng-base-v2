import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DialogModule } from "./core/modules/dialog/dialog.module";
import { TestDialogComponent } from "./shared/components/test-dialog/test-dialog.component";
import { SlideDialogComponent } from "./shared/components/full-slide-dialog/full-slide-dialog.component";

@NgModule({
  declarations: [AppComponent, TestDialogComponent, SlideDialogComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
