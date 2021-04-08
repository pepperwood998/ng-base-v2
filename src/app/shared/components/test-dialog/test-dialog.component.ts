import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnInit,
} from "@angular/core";
import {
  APP_DIALOG_DATA,
  DialogRef,
} from "src/app/core/modules/dialog/dialog.type";
import { DialogInstanceBaseComponent } from "src/app/core/modules/dialog/dialog-instance-base.component";

@Component({
  selector: "app-test-dialog",
  templateUrl: "./test-dialog.component.html",
  styleUrls: ["./test-dialog.component.scss"],
  animations: [
    trigger("slide", [
      state("void", style({ bottom: "-100%" })),
      state("enter", style({ bottom: "0" })),
      state("leave", style({ bottom: "-100%" })),
      transition("* => *", animate("0.3s ease")),
    ]),
  ],
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
