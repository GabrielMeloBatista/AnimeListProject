import { Component, OnInit, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import { delay } from "rxjs";
import { filter } from "rxjs/operators";
import { OverlayContainer } from "@angular/cdk/overlay";
import { ThemeMode, ThemeService } from "../../service/theme.service";
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
    private overlayContainer: OverlayContainer,
    private themeService: ThemeService,
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

    this.currentTheme = this.themeService.getStoredTheme();
    this.applyTheme(this.currentTheme);
  }

  toggleTheme(): void {
    if (this.currentTheme === ThemeMode.Light) {
      this.currentTheme = ThemeMode.Dark;
    } else if (this.currentTheme === ThemeMode.Dark) {
      this.currentTheme = ThemeMode.Light;
    }
    this.applyTheme(this.currentTheme);
    this.themeService.storeTheme(this.currentTheme);
    console.log("Theme");
  }

  private applyTheme(theme: ThemeMode): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    this.overlayContainer.getContainerElement().classList.remove('mat-light-theme', 'mat-dark-theme');

    if (theme === ThemeMode.Light) {
      document.body.classList.add('light-theme');
      this.overlayContainer.getContainerElement().classList.add('mat-light-theme');
    } else if (theme === ThemeMode.Dark) {
      document.body.classList.add('dark-theme');
      this.overlayContainer.getContainerElement().classList.add('mat-dark-theme');
    }
  }

  logado():boolean {
    return this.securityService.isValid();
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(['/']);
  }

  logar() {
    this.router.navigate(['/access']);
  }
}
