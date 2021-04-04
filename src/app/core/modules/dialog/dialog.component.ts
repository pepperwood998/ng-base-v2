import { ComponentType } from "@angular/cdk/portal";
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from "@angular/core";
import { DialogConfig, DialogRef } from "./dialog.type";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent<T> implements OnInit {
  @HostBinding("class.app-dialog-wrapper") classAppDialogWrapper = true;

  componentType: ComponentType<T>;
  config: DialogConfig;

  constructor(private _dialogRef: DialogRef<T>) {}

  ngOnInit(): void {
    this.componentType = this._dialogRef.componentType;
    this.config = this._dialogRef.config;
  }
}
