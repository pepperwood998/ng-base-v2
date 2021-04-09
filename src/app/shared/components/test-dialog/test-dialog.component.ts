import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from "@angular/core";
import { DialogInstanceBaseComponent } from "src/app/core/modules/dialog/dialog-instance-base.component";
import {
  APP_DIALOG_DATA,
  DialogRef,
} from "src/app/core/modules/dialog/dialog.type";

@Component({
  selector: "app-test-dialog",
  templateUrl: "./test-dialog.component.html",
  styleUrls: ["./test-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent
  extends DialogInstanceBaseComponent
  implements OnInit {
  constructor(
    private _dialogRef: DialogRef<TestDialogComponent>,
    @Inject(APP_DIALOG_DATA) private _data: any,
  ) {
    super();
  }

  ngOnInit(): void {
    console.log(this._data);
  }

  close(): void {
    this._dialogRef.close({ result: this._data });
  }
}
