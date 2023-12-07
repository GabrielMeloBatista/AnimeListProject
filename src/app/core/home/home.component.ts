import { Component, OnInit, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import { debounceTime, delay, distinctUntilChanged, Observable, of, startWith, switchMap } from "rxjs";
import { filter, map } from "rxjs/operators";
import { ThemeMode } from "../../service/theme.service";
import { SecurityService } from "../../arquiteture/security/security.service";
import { FormControl } from "@angular/forms";
import { AnimeControllerService } from "../../api/services/anime-controller.service";
import { data } from "autoprefixer";
import { Anime } from "../../api/models/anime";

@UntilDestroy()
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  myControl = new FormControl("");
  options: Anime[] = [];
  filteredOptions!: Observable<Anime[]>;
  value: string = "";

  currentTheme: ThemeMode = ThemeMode.System;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    public animeService: AnimeControllerService,
    private observer: BreakpointObserver,
    private router: Router,
    private securityService: SecurityService
  ) {
    if (this.router.url === "/") {
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

    // Filter
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(""),
    //   debounceTime(400),
    //   distinctUntilChanged(),
    //   map(value => this._filter(value || ""))
    // );
    this.filteredOptions = this.myControl.valueChanges.pipe(
      switchMap(value => this._filter(value ?? ""))
    );

    this.animeService.getDados1({ offset: 0, limit: 10 }).subscribe(data => {
      this._treatSearchBar(data);
    });
  }

  private _treatSearchBar(data: any) {
    if (Array.isArray(data)) {
      // Se data for uma lista/array, adiciona os novos itens à lista existente
      data.forEach(item => this.options.push(item.nome));
    } else {
      // Caso contrário, trata data como um item único e o adiciona à lista existente
      this.options.push(data.nome);
    }
  }

  private _filter(value: string): Observable<Anime[]> {
    const filterValue = value.toLowerCase();
    return this.animeService.searchBooks({ searchTerm: value }).pipe(
      map((data: Anime[]) => {
        this._treatSearchBar(data);

        return data.filter(option => option.nome?.toLowerCase().includes(filterValue) ?? false);
      })
    );
  }


  logado(): boolean {
    return this.securityService.isValid();
  }

  sair() {
    this.securityService.invalidate();
    this.router.navigate(["/home"]);
  }

  logar() {
    this.router.navigate(["/access"]);
  }

  searchInput(option: Anime | undefined) {
    if (option != undefined)
    {
      this.router.navigate([`/anime/list/${option.id}`]);
    }
  }
}
