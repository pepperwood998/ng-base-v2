import { ComponentType, OverlayRef } from "@angular/cdk/overlay";
import { Subject } from "rxjs";

export class DialogRef<T, D = any, R = any> {
  afterClosed$ = new Subject<R>();

  constructor(
    private _overlayRef: OverlayRef,
    public componentType: ComponentType<T>,
    public config: DialogConfig<D>,
  ) {
    _overlayRef.addPanelClass(config?.panelClass);
    _overlayRef.backdropClick().subscribe(() => this.close());
  }

  close(returnedData?: R): void {
    this._overlayRef.dispose();
    this.afterClosed$.next(returnedData);
    this.afterClosed$.complete();
  }
}

export class DialogConfig<D = any> {
  data?: D;
  panelClass?: string | string[];
}
