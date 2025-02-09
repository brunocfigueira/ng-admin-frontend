import {Component} from '@angular/core';
import {OutputService} from '../../../../services/common/output.service';
import {ActionButtonComponent} from "../../../../shared-components/common/action-button/action-button.component";

@Component({
  selector: 'app-snackbar-example',
  imports: [
    ActionButtonComponent,
  ],
  templateUrl: './snackbar-example.component.html',
  styleUrl: './snackbar-example.component.css'
})
export class SnackbarExampleComponent {
  constructor(private outputService: OutputService) {
  }

  onClickButtonShortMessage(value: number): void {
    switch (value) {
      case 1:
        this.outputService.showShortMessageSuccess('Message Success.');
        break;
      case 2:
        this.outputService.showShortMessageError('Message Error.');
        break;
      case 3:
        this.outputService.showShortMessageWarning('Message Warning.');
        break;
      case 4:
        this.outputService.showShortMessageInfo('Message Info.');
        break;
      case 5:
        this.outputService.showShortMessageDefault('Message Default.');
        break;
      default:
        break;
    }
  }
}
