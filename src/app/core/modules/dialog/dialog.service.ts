import { ComponentType, Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { DialogModule } from "./dialog.module";
import {
  APP_DIALOG_DATA,
  DialogConfig,
  DialogHelper,
  DialogRef,
} from "./dialog.type";
import { DialogInstanceBaseComponent } from "./dialog-instance-base.component";

@Injectable({
  providedIn: DialogModule,
})
export class DialogService {
  private _openDialogs: DialogRef<any>[] = [];

  constructor(private _overlay: Overlay, private _injector: Injector) {}

  open<T extends DialogInstanceBaseComponent, D = any, R = any>(
    componentType: ComponentType<T>,
    config?: DialogConfig<D>,
  ): DialogRef<T, R> {
    const positionStrategy = this._overlay.position().global();
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
      backdropClass: config?.backdropClass,
      panelClass: config?.panelClass,
    });
    const overlayRef = this._overlay.create(overlayConfig);
    overlayRef.hostElement.classList.add(
      ...DialogHelper.getStringArray(config?.wrapperClass),
    );

    const containerInjector = Injector.create({
      parent: this._injector,
      providers: [{ provide: DialogConfig, useValue: config }],
    });
    const container = overlayRef.attach(
      new ComponentPortal(DialogComponent, null, containerInjector),
    ).instance;

    const dialogRef = new DialogRef<T, R>(overlayRef, container);
    const injector = this._createInjector(container, dialogRef, config);
    const componentRef = container.attachComponentPortal(
      new ComponentPortal(componentType, null, injector),
    );
    dialogRef.componentInstance = componentRef.instance;

    this._openDialogs.push(dialogRef);
    return dialogRef;
  }

  closeAll(): void {
    let i = this._openDialogs.length;
    while (i--) {
      this._openDialogs[i].close();
    }
  }

  private _createInjector<T extends DialogInstanceBaseComponent>(
    container: DialogComponent,
    ref: DialogRef<T>,
    config?: DialogConfig,
  ): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        {
          provide: DialogRef,
          useValue: ref,
        },
        {
          provide: APP_DIALOG_DATA,
          useValue: config?.data,
        },
        {
          provide: DialogComponent,
          useValue: container,
        },
      ],
    });
  }
}
