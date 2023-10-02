import { Component, Inject } from "@angular/core";
import { MessageItem } from "../message.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  public item: MessageItem;

  /**
   * Construtor da classe.
   *
   * @param dialogRef
   * @param data
   */
  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) data: ConfirmationDialogData) {
    console.log("data:", data);
    this.item = data.item;
  }

  /**
   * Execulta o callback para as ações 'OK/YES'.
   */
  public onConfirmYesOk(): void {
    this.dialogRef.close();
    this.item.executYesOk();
  }

  /**
   * Execulta o callback para a ação 'NO'.
   */
  public onConfirmNo(): void {
    this.dialogRef.close();
    this.item.executNo();
  }
}

export interface ConfirmationDialogData {
  minWidth: string,
  minHeight: string,
  disableClose: boolean,
  item: MessageItem
}
