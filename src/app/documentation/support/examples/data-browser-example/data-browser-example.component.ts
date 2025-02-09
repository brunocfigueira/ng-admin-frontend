import {Component} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {APP_CONST} from '../../../../constants/app-constants';
import {WindowSizeService} from '../../../../services/common/window-size.service';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';

@Component({
  selector: 'app-data-browser-example',
  imports: [
    JsonPipe,
    ActionButtonComponent
  ],
  templateUrl: './data-browser-example.component.html',
  styleUrl: './data-browser-example.component.css'
})
export class DataBrowserExampleComponent {
  protected appConst = APP_CONST;
  protected dataWindowValue: any;

  constructor(private windowSizeService: WindowSizeService) {
  }

  onClickButtonDataWindow(value: number): void {
    switch (value) {
      case 1:
        this.dataWindowValue = this.windowSizeService.getCurrentSize();
        break;
      case 2:
        this.dataWindowValue = this.windowSizeService.getCurrentWidthByPercentage(0.3);
        break;
      case 3:
        this.dataWindowValue = this.windowSizeService.getCurrentHeightByPercentage(0.3);
        break;
      default:
        break;
    }
  }
}
