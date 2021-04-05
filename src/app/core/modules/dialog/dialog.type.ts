import { OverlayRef } from "@angular/cdk/overlay";
import { InjectionToken } from "@angular/core";
import { Subject } from "rxjs";

export class DialogRef<T, R = any> {
  afterClosed$ = new Subject<R>();

  componentInstance: T;

  constructor(private _overlayRef: OverlayRef) {
    this.componentInstance = null;

    _overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
  }

  close(returnedData?: R): void {
    this._overlayRef.dispose();
    this.afterClosed$.next(returnedData);
    this.afterClosed$.complete();
  }
}

export const APP_DIALOG_DATA = new InjectionToken<any>("APP_DIALOG_DATA");

export class DialogConfig<D = any> {
  data?: D;
  backdropClass?: string | string[] = "";
  wrapperClass?: string | string[] = "";
  panelClass?: string | string[] = "";
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
