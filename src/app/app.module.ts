import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { HomeComponent } from "./core/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { ConfirmationDialog } from "./core/confirmation-dialog/confirmation-dialog.component";
import { RouterModule } from "@angular/router";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { AnimeModule } from "./pages/anime/anime.module";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatOptionModule } from "@angular/material/core";
import { HelpComponent } from "./pages/help/help.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoaderDialogComponent } from "./arquiteture/loader-dialog/loader-dialog.component";
import { LoaderModule } from "./arquiteture/loader/loader.module";
import { MatRadioModule } from "@angular/material/radio";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

"" +
"anime/anime.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDialog,
    HelpComponent,
    LoaderDialogComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    AnimeModule,
    LoaderModule,
    MatRadioModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
