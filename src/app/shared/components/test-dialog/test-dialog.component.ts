import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import {
  APP_DIALOG_DATA,
  DialogRef,
} from "src/app/core/modules/dialog/dialog.type";
import { PopUpDialogComponent } from "../pop-up-dialog/pop-up-dialog.component";

@Component({
  selector: "app-test-dialog",
  templateUrl: "./test-dialog.component.html",
  styleUrls: ["./test-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent
  extends PopUpDialogComponent
  implements OnInit {
  constructor(
    private _dialogRef: DialogRef<TestDialogComponent>,
    @Inject(APP_DIALOG_DATA) private _data: any,
    cdr: ChangeDetectorRef,
  ) {
    super(cdr);
  }

  ngOnInit(): void {}

  close(): void {
    this._dialogRef.close({ result: this._data });
  }

  toggleExpand(): void {
    this.animationState =
      this.animationState === "expand" ? "notExpand" : "expand";
  }
}
