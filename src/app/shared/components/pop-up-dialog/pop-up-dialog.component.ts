import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  OnInit,
} from "@angular/core";
import { DialogInstanceBaseComponent } from "src/app/core/modules/dialog/dialog-instance-base.component";
import { popUp } from "../../animations/dialog.animation";

@Component({
  selector: "app-pop-up-dialog",
  template: "",
  animations: [popUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpDialogComponent
  extends DialogInstanceBaseComponent
  implements OnInit {
  @HostBinding("class.app-pop-up-dialog")
  defaultConfig = true;

  @HostBinding("@popUp") get popUp() {
    return this.animationState;
  }

  @HostListener("@popUp.start", ["$event"])
  animationStart = this.onAnimationStart;

  @HostListener("@popUp.done", ["$event"])
  animationDone = this.onAnimationDone;

  ngOnInit(): void {}
}
