import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { AnimationEvent } from "@angular/animations";
import { slideFull } from "../../animations/dialog.animation";

@Component({
  selector: "app-full-slide-dialog",
  templateUrl: "./full-slide-dialog.component.html",
  styleUrls: ["./full-slide-dialog.component.scss"],
  animations: [slideFull],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDialogComponent implements OnInit {
  @Input() animationState: "void" | "enter" | "leave";
  @Output() animationStart = new EventEmitter<any>();
  @Output() animationDone = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onAnimationStart(value: AnimationEvent): void {
    this.animationStart.emit(value);
  }

  onAnimationDone(value: AnimationEvent): void {
    this.animationDone.emit(value);
  }
}
