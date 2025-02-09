import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared-components/common/dialog/dialog.component';
import {APP_CONST} from '../../constants/app-constants';
import {ColorUtil} from '../../utils/color-util';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {WindowSizeService} from './window-size.service';
import {DialogActionButtonsType} from '../../shared-components/types/dialog-type';

@Injectable({
  providedIn: 'root'
})
export class BoxDialogService {

  protected readonly appConst = APP_CONST;
  backgroundColor = '';
  color = '';
  maxContentHeight = 300;

  constructor(private dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private windowSizeService: WindowSizeService) {
  }

  private sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  private defineBoxColor(color: string): void {
    this.backgroundColor = color;
    this.color = ColorUtil.getTextColorForBackground(this.backgroundColor);
  }

  private openBoxDialog(options: {
    title: string;
    message: string | SafeHtml;
    actions?: DialogActionButtonsType[];
    size: number;
  }): void {
    this.dialog.open(DialogComponent, {
      width: `${options.size}px`,
      disableClose: true, // Impede que o usuário feche clicando fora do modal
      data: {
        title: options.title,
        message: options.message,
        backgroundColor: this.backgroundColor,
        color: this.color,
        contentHeight: this.maxContentHeight,
        actions: options.actions || [] // Botões de ação
      }
    });
  }

  openBoxDialogConfirmation(message: string, btnActions: DialogActionButtonsType[], boxSize?: number, color?: string) {

    this.defineBoxColor(color || this.appConst.DIALOG.BOX_CONFIRMATION.COLOR);
    this.openBoxDialog({
      title: this.appConst.DIALOG.BOX_CONFIRMATION.TITLE,
      message: this.sanitizeHtml(message),
      actions: btnActions,
      size: boxSize || this.appConst.DIALOG.BOX_CONFIRMATION.SIZE
    });
  }

  openBoxDialogAttention(message: string, btnActions: DialogActionButtonsType[], boxSize?: number, color?: string) {

    this.defineBoxColor(color || this.appConst.DIALOG.BOX_ATTENTION.COLOR);
    this.openBoxDialog({
      title: this.appConst.DIALOG.BOX_ATTENTION.TITLE,
      message: this.sanitizeHtml(message),
      actions: btnActions,
      size: boxSize || this.appConst.DIALOG.BOX_ATTENTION.SIZE
    });
  }

  openBoxDialogInformation(message: string, btnActions: DialogActionButtonsType[], boxSize?: number, color?: string) {

    this.defineBoxColor(color || this.appConst.DIALOG.BOX_INFORMATION.COLOR);
    this.openBoxDialog({
      title: this.appConst.DIALOG.BOX_INFORMATION.TITLE,
      message: this.sanitizeHtml(message),
      actions: btnActions,
      size: boxSize || this.appConst.DIALOG.BOX_INFORMATION.SIZE
    });
  }

  openBoxDialogTextual(title: string, message: string, btnActions?: DialogActionButtonsType[], boxSize?: number, color?: string) {
    this.defineBoxColor(color || this.appConst.DIALOG.BOX_TEXTUAL.COLOR);
    this.maxContentHeight = this.windowSizeService.getCurrentHeightByPercentage(0.35);
    this.openBoxDialog({
      title: title,
      message: this.sanitizeHtml(message),
      actions: btnActions,
      size: boxSize || this.windowSizeService.getCurrentWidthByPercentage(0.2)
    });
  }

  openBoxDialogDefault(title: string, message: string, btnActions?: DialogActionButtonsType[], boxSize?: number) {
    this.defineBoxColor(this.appConst.DIALOG.BOX_DEFAULT.COLOR);
    this.openBoxDialog({
      title: title,
      message: this.sanitizeHtml(message),
      actions: btnActions,
      size: boxSize || this.windowSizeService.getCurrentWidthByPercentage(0.5)
    });
  }
}
