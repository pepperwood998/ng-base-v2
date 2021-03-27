import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Observable, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { ComponentService } from "src/app/services/component.service";

@Component({
  selector: "app-base",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, OnDestroy {
  protected session$: Subject<void>;
  protected destroy$: Subject<void>;

  constructor(protected componentService: ComponentService) {}

  ngOnInit(): void {
    this.preInit();
    this.session$ = new Subject<void>();
    this.destroy$ = new Subject<void>();
    this.postInit();
  }

  preInit(): void {}

  postInit(): void {}

  ngOnDestroy(): void {
    this.preDestroy();
    this.destroy();
    this.postDestroy();
  }

  preDestroy(): void {}

  postDestroy(): void {}

  protected get queryParams$(): Observable<Params> {
    return this.activatedRoute.queryParams;
  }

  protected get queryParams(): Params {
    return this.activatedRoute.snapshot.queryParams;
  }

  protected get pathParams$(): Observable<Params> {
    return this.activatedRoute.params;
  }

  protected get pathParams(): Params {
    return this.activatedRoute.snapshot.params;
  }

  protected get activatedRoute(): ActivatedRoute {
    return this.componentService.activatedRoute;
  }

  protected get router(): Router {
    return this.componentService.router;
  }

  protected get location(): Location {
    return this.componentService.location;
  }

  protected pipeOnce<T>(observable: Observable<T>): Observable<T> {
    return this.pipeDestroy(observable).pipe(take(1));
  }

  protected pipeNext<T>(observable: Observable<T>): Observable<T> {
    this.resetSession();
    return this.pipeSession(observable);
  }

  protected pipeSession<T>(observable: Observable<T>): Observable<T> {
    return this.pipeDestroy(observable).pipe(takeUntil(this.session$));
  }

  protected pipeDestroy<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this.destroy$));
  }

  protected resetSession(): void {
    this.resolveSession();
    this.session$ = new Subject<void>();
  }

  private destroy(): void {
    this.resolveSession();
    if (this.destroy$ && !this.destroy$.closed) {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  private resolveSession(): void {
    if (this.session$ && !this.session$.closed) {
      this.session$.next();
      this.session$.complete();
    }
  }
}
