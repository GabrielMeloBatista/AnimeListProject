import { Component, OnInit, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import { delay } from "rxjs";
import { filter } from "rxjs/operators";
import { ThemeMode } from "../../service/theme.service";
import {SecurityService} from "../../arquiteture/security/security.service";

@UntilDestroy()
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  currentTheme: ThemeMode = ThemeMode.System;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private securityService: SecurityService
  ) {
    if (this.router.url === '/'){
      this.router.navigate(["/home"]);
    }
  }

  ngOnInit() {
    this.observer
      .observe(["(max-width: 800px)"])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === "over") {
          this.sidenav.close();
        }
      });
  }

  logado():boolean {
    return this.securityService.isValid();
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/home']);
  }

  logar() {
    this.router.navigate(['/access']);
  }
}
