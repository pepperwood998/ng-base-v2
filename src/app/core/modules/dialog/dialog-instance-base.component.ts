import { AnimationEvent } from "@angular/animations";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-dialog-instance-base",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInstanceBaseComponent implements OnInit {
  animationState: "void" | "enter" | "leave" | string = "enter";
  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.animationState = "leave";
    this.changeDetectorRef.markForCheck();
  }
}
