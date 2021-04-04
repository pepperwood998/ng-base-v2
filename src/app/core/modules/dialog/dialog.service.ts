import { ComponentType, Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { DialogModule } from "./dialog.module";
import { DialogConfig, DialogRef } from "./dialog.type";

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  private _dialogRefs: DialogRef<any>[] = [];

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open<T, D = any, R = any>(
    componentType: ComponentType<T>,
    config?: DialogConfig<D>,
  ): DialogRef<T, D, R> {
    const positionStrategy = this._overlay.position().global();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
    });
    const overlayRef = this._overlay.create(overlayConfig);

    const dialogRef = new DialogRef<T, D, R>(overlayRef, componentType, config);
    const injector = this._createInjector<T, D, R>(dialogRef, this._injector);
    overlayRef.attach(new ComponentPortal(DialogComponent, null, injector));

    this._dialogRefs.push(dialogRef);
    return dialogRef;
  }

  closeAll(): void {
    let i = this._dialogRefs.length;
    while (i--) {
      this._dialogRefs[i].close();
    }
  }

  private _createInjector<T, D = any, R = any>(
    ref: DialogRef<T, D, R>,
    injector: Injector,
  ): Injector {
    return Injector.create({
      parent: injector,
      providers: [
        {
          provide: DialogRef,
          useValue: ref,
        },
      ],
    });
  }
}
