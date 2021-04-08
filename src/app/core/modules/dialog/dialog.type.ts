import { OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Subject } from "rxjs";
import { filter, take } from "rxjs/operators";
import { DialogInstanceBaseComponent } from "./dialog-instance-base.component";
import { DialogComponent } from "./dialog.component";

export class DialogRef<T extends DialogInstanceBaseComponent, R = any> {
  beforeClosed$ = new Subject<R>();
  afterClosed$ = new Subject<R>();

  componentInstance: T;

  constructor(
    private _overlayRef: OverlayRef,
    private _containerInstance: DialogComponent,
  ) {
    this.componentInstance = null;

    _overlayRef.backdropClick().subscribe(() => {
      if (!_containerInstance.config.disableClose) {
        this.close();
      }
    });
  }

  close(returnedData?: R): void {
    this.componentInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === "start"),
        take(1),
      )
      .subscribe(() => {
        this.beforeClosed$.next();
        this.beforeClosed$.complete();
        this._overlayRef.detachBackdrop();
      });

    this.componentInstance.animationStateChanged
      .pipe(
        filter(
          (event) => event.phaseName === "done" && event.toState === "leave",
        ),
        take(1),
      )
      .subscribe(() => {
        this._overlayRef.dispose();
        this.afterClosed$.next(returnedData);
        this.afterClosed$.complete();

        this.componentInstance = null;
      });

    this.componentInstance.startExitAnimation();
  }
}

export const APP_DIALOG_DATA = new InjectionToken<any>("APP_DIALOG_DATA");

export class DialogConfig<D = any> {
  data?: D;
  backdropClass?: string | string[] = "";
  wrapperClass?: string | string[] = "";
  panelClass?: string | string[] = "";
  disableClose?: boolean = false;
}

export class DialogHelper {
  static getStringArray(value: string | string[]): string[] {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  }
}
