import { CdkPortalOutlet, ComponentPortal } from "@angular/cdk/portal";
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  HostBinding,
  OnInit,
  ViewChild,
} from "@angular/core";
import { DialogRef } from "./dialog.type";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  @HostBinding("class.app-dialog-host") classAppDialogHost = true;
  @ViewChild(CdkPortalOutlet, { static: true })
  private _portalOutlet: CdkPortalOutlet;

  constructor() {}

  ngOnInit(): void {}

  attachComponentPortal<T>(
    componentPortal: ComponentPortal<T>,
  ): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(componentPortal);
  }
}
