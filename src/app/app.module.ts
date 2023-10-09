import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { HomeComponent } from "./core/home/home.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatDialogActions, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AlertMessageComponent } from './message/alert-message/alert-message.component';
import { ConfirmDialogComponent } from './message/confirm-dialog/confirm-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationModule} from "./arquiteture/authentication/authentication.module";
import {SecurityModule} from "./arquiteture/security/security.module";
import {SecurityInterceptor} from "./arquiteture/security/security.interceptor";
import {MessageModule} from "./message/message.module";
import {AppInterceptor} from "./arquiteture/app.interceptor";
import { MatCardModule } from "@angular/material/card";
import { ConfirmationDialog } from "./core/confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    LoaderDialogComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ConfirmationDialog
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
    MatProgressSpinnerModule,
    AuthenticationModule,
    MessageModule.forRoot(),
    SecurityModule, //TODO conferir a configuração
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/access/login',
    }),
    MatCardModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
