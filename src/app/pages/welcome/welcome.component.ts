import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  previousScrollPosition = window.scrollY;
  count = 0;
  size = 3;

  constructor(private router: Router) {
  }

  @HostListener("window:scroll", ["$event"])
  onScroll() {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > this.previousScrollPosition) {
      this.count += 1;
    } else if (currentScrollPosition < this.previousScrollPosition) {
      this.count -= 1;
    }
    if (this.count < 0) {
      this.count = this.size;
    } else if (this.count > this.size) {
      this.count = 0;
    }

    this.router.navigate(["home#" + this.count]);
  }
}
