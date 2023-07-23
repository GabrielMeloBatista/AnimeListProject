import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoaderService} from "./arquiteture/loader/loader.service";
import {LoaderDialogComponent} from "./arquiteture/loader-dialog/loader-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AnimeListProject';

  private dialogRef!: MatDialogRef<any>;
  public constructor(
    private dialog: MatDialog,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
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
  }
}
