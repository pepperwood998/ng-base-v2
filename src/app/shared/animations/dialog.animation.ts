import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const slideFull = trigger("slideFull", [
  state("void", style({ bottom: "-100%" })),
  state("enter", style({ bottom: "0" })),
  state("leave", style({ bottom: "-100%" })),
  transition("* => *", animate("0.3s ease")),
]);
