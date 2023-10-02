import { Component } from '@angular/core';
import { animate, query, style, transition, trigger } from "@angular/animations";
import { MessageItem, MessageService } from "../message.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'alert-message',
  styleUrls: ['./alert-message.component.scss'],
  templateUrl: './alert-message.component.html',
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        query(':enter', [
            style({ opacity: 0 })],
          { optional: true }
        ),
        query(':leave',
          [
            style({ opacity: 1 }),
            animate('.5s', style({ opacity: 0 }))
          ],
          { optional: true }),
        query(':enter',
          [
            style({ opacity: 0 }),
            animate('.5s', style({ opacity: 1 }))
          ],
          { optional: true }
        )])
    ])]
})

export class AlertMessageComponent {
  public show = false;

  private static RUNTIME_MILLISECONDS = 5000;

  public items: MessageItem[];

  /**
   * Construtor da classe.
   *
   * @param messageService
   * @param domSanitizer
   */
  constructor(
    private messageService: MessageService, public domSanitizer: DomSanitizer) {
    this.items = [];
    this.messageService.getMsgEmitter().subscribe(item => {
      console.log("msgEmitter:", item);
      this.addMsgItem(item)
    });
  }

  /**
   * Adiciona o item de mensagem a visualização.
   *
   * @param messageItem
   */
  private addMsgItem(messageItem: MessageItem): void {
    const count = this.items.filter(item => item.msg === messageItem.msg).length;

    if (count === 0) {
      this.items.push(messageItem);

      setTimeout(() => {
        this.removeMsg(messageItem);
      }, AlertMessageComponent.RUNTIME_MILLISECONDS);
    }
    if (this.items.length > 0) {
      this.show = true;
    }
  }

  /**
   * Remove o item de mensagem da visualização.
   *
   * @param messageItem
   */
  public removeMsg(messageItem: MessageItem): void {
    this.items = this.items.filter(item => item.msg !== messageItem.msg);
    if (this.items.length == 0) {
      this.show = false;
    }
  }

  public fecharToast() {
    this.items = [];
    this.show = false;
  }
}
