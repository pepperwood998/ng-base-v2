import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ComponentService {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public location: Location,
  ) {}
}
