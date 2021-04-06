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

@Component({
  selector: "app-test-dialog",
  templateUrl: "./test-dialog.component.html",
  styleUrls: ["./test-dialog.component.scss"],
  animations: [
    trigger("slideUp", [
      state("void", style({ bottom: "-100%" })),
      state("enter", style({ bottom: "0" })),
      state("leave", style({ bottom: "-100%" })),
      transition("* => *", animate("200ms cubic-bezier(0.25, 0.8, 0.25, 1)")),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialogComponent implements OnInit {
  @HostBinding("@slideUp") slideUp = "enter";

  constructor(
    private _dialogRef: DialogRef<TestDialogComponent>,
    @Inject(APP_DIALOG_DATA) private _data: any,
  ) {}

  ngOnInit(): void {
    console.log(this._data);
  }

  close(): void {
    this._dialogRef.close({ result: this._data });
  }
}
