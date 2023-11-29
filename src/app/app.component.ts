import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoaderService} from "./arquiteture/loader/loader.service";
import {LoaderDialogComponent} from "./arquiteture/loader-dialog/loader-dialog.component";
import { ThemeMode, ThemeService } from "./service/theme.service";
import { OverlayContainer } from "@angular/cdk/overlay";
import {SecurityService} from "./arquiteture/security/security.service";
import {AuthenticationService} from "./arquiteture/authentication/authentication.service";
import {User} from "./arquiteture/security/User";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageItem, MessageService} from "./message/message.service";
import {ConfirmationDialog} from "./core/confirmation-dialog/confirmation-dialog.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AnimeListProject';

  private dialogRef!: MatDialogRef<any>;
  public constructor(
    private router: Router,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private autenticationService: AuthenticationService,
    private securityService: SecurityService,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.securityService.onRefresh.subscribe((refreshToken: string) => {

      this.autenticationService.refresh(refreshToken).subscribe(
        (data: {
          id: any;
          nome: any;
          login: any;
          accessToken: any;
          refreshToken: any;
          expiresIn: any;
          roles: any;
        }) => {
          const user: User = {
            id: data.id,
            nome: data.nome,
            login: data.login,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresIn: data.expiresIn,
            roles: data.roles,
          };
          this.securityService.init(user);
        },
        (error: any) => {
          this.messageService.addMsgInf(error);
        }
      );
    });

    this.securityService.onForbidden.subscribe(() => {
      this.messageService.addMsgWarning("Sem acesso");
      //this.router.navigate([this.config.loginRouter]);
      this.router.navigate(['/']);
    });

    this.securityService.onUnauthorized.subscribe(() => {
      this.messageService.addMsgWarning("Não autorizado!");
      this.router.navigate(['/']);
      this.securityService.invalidate();
    });
    this.securityService.init();

    this.loaderService.onStart.subscribe(() => {
      this.dialogRef = this.dialog.open(LoaderDialogComponent, {
        minWidth: '50px',
        minHeight: '50px',
        hasBackdrop: true,
        disableClose: true
      });
    });

    this.loaderService.onStop.subscribe(() => {
      if (this.dialogRef !== undefined) {
        this.dialogRef.close();
      }
    });
    this.messageService.getConfirmEmitter().subscribe((item: MessageItem) => this.addConfirmItem(item));
  }

  /**
   * Adiciona o modal de confirmação a view.
   *
   * @param item
   */
  private addConfirmItem(item: MessageItem): void {
    this.dialog.open(ConfirmationDialog, {
      minWidth: '30%',
      minHeight: '30%',
      disableClose: true,
      data: { item }
    });
  }
}
