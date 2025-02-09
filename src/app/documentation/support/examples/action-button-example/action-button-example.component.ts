import {Component} from '@angular/core';
import {APP_CONST} from '../../../../constants/app-constants';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';

@Component({
  selector: 'app-action-button-example',
  imports: [
    ActionButtonComponent
  ],
  templateUrl: './action-button-example.component.html',
  styleUrl: './action-button-example.component.css'
})
export class ActionButtonExampleComponent {
  protected readonly appConst = APP_CONST;
}
