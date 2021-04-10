import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
} from "@angular/core";
import { DialogInstanceBaseComponent } from "src/app/core/modules/dialog/dialog-instance-base.component";
import { slide } from "src/app/shared/animations/dialog.animation";

@Component({
  selector: "app-slide-dialog",
  template: "",
  animations: [slide],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDialogComponent
  extends DialogInstanceBaseComponent
  implements OnInit {
  @HostBinding("class.app-slide-dialog")
  defaultConfig = true;

  @HostBinding("@slide") get slide() {
    return this.animationState;
  }

  @HostListener("@slide.start", ["$event"])
  animationStart = this.onAnimationStart;

  @HostListener("@slide.done", ["$event"])
  animationDone = this.onAnimationDone;

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
