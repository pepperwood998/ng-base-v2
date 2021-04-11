import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

export const slide = trigger("slide", [
  state("void", style({ bottom: "-100%" })),
  state("enter", style({ bottom: "0" })),
  state("expand", style({ height: "100%" })),
  state("leave", style({ bottom: "-100%" })),
  transition("* => *", animate("0.3s ease")),
]);

export const popUp = trigger("popUp", [
  state("void", style({ opacity: 0 })),
  state("enter", style({ opacity: 1 })),
  state("leave", style({ opacity: 0 })),
  transition("* => *", animate("0.3s ease")),
]);
