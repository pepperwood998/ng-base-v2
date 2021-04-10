import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { DialogService } from "src/app/core/modules/dialog/dialog.service";
import { TestDialogComponent } from "src/app/shared/components/test-dialog/test-dialog.component";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent implements OnInit {
  constructor(private _dialogService: DialogService) {}

  ngOnInit(): void {}

  open(): void {
    this._dialogService.open(TestDialogComponent, {
      backdropClass: "partial-dialog-backdrop",
      wrapperClass: "partial-dialog-wrapper",
      data: 2,
      disableClose: true,
    });
  }
}
