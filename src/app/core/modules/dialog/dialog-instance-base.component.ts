import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { AnimationEvent } from "@angular/animations";

@Component({
  selector: "app-dialog-instance-base",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogInstanceBaseComponent implements OnInit {
  animationState: "void" | "enter" | "leave" = "enter";
  animationStateChanged = new EventEmitter<AnimationEvent>();

  constructor() {}

  ngOnInit(): void {}

  onAnimationStart(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent): void {
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.animationState = "leave";
  }
}
