import {Component} from '@angular/core';
import {CRUD_MESSAGES} from '../../../../constants/crud-messages';
import {BoxDialogService} from '../../../../services/common/box-dialog.service';
import {APP_CONST} from '../../../../constants/app-constants';
import {OutputService} from '../../../../services/common/output.service';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";

@Component({
  selector: 'app-box-dialog-example',
    imports: [

        ActionButtonComponent
    ],
  templateUrl: './box-dialog-example.component.html',
  styleUrl: './box-dialog-example.component.css'
})
export class BoxDialogExampleComponent {
  protected optActions: { label: string; callback?: () => void }[] = [];
  protected appConst = APP_CONST;

  constructor(private boxDialogService: BoxDialogService, private outputService: OutputService) {
  }

  onClickButtonBoxDialog(value: number): void {
    this.optActions = [];
    switch (value) {
      case 1:
        this.optActions.push({
          label: 'OK',
          callback: () => this.callbackOk()
        })
        this.boxDialogService.openBoxDialogConfirmation(
          'Which option do you want to choose?',
          this.optActions
        );
        break;
      case 2:
        this.optActions.push({
          label: this.appConst.ACTION_BUTTON.LABEL.YES,
          callback: () => this.callbackDelete()
        })
        this.boxDialogService.openBoxDialogAttention(
          CRUD_MESSAGES.DELETE_DIALOG,
          this.optActions
        );
        break;
      case 3:
        this.boxDialogService.openBoxDialogInformation(
          'This feature is temporarily offline. Please try again later.',
          []
        );
        break;
      case 4:
        this.optActions.push({
          label: 'Copy text',
          callback: () => this.copyText()
        })
        this.boxDialogService.openBoxDialogTextual('My Title Textual', this.generateStyledText(), this.optActions)
        break;
      case 5:
        this.boxDialogService.openBoxDialogDefault(
          'My Title Default',
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          [],
          400)
        break;
      default:
        break;
    }
  }

  private callbackDelete(): void {
    this.outputService.showShortMessageDefault(CRUD_MESSAGES.DELETED_SUCCESS);
  }

  private copyText(): void {
    this.outputService.showShortMessageDefault('Copy text successfully!');
  }

  private callbackOk(): void {
    this.outputService.showShortMessageSuccess('Your choice was the OK option');
  }

  private generateStyledText(): string {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const fonts = ['Arial', 'Verdana', 'Georgia', 'Tahoma', 'Courier New'];
    const sizes = ['14px', '16px', '18px', '20px', '22px'];

    // Texto padrão para cada linha
    const loremIpsum =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    let htmlContent = '';

    for (let i = 1; i <= 600; i++) {
      // Gera valores aleatórios
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

      // Adiciona um parágrafo estilizado ao HTML
      htmlContent += `
      <p style="color: ${randomColor}; font-family: ${randomFont}; font-size: ${randomSize}; margin: 5px 0;">
        ${i}. ${loremIpsum}
      </p>
    `;
    }

    return htmlContent;
  }


}
