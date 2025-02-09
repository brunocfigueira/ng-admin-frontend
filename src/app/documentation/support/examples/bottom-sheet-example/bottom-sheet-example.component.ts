import {Component} from '@angular/core';
import {BottomSheetService} from '../../../../services/common/bottom-sheet.service';
import {
  BottomSheetNotifyComponent
} from '../../../../shared-components/common/bottom-sheet-notify/bottom-sheet-notify.component';
import {ActionButtonComponent} from '../../../../shared-components/common/action-button/action-button.component';
import {PushNotificationType} from '../../../../shared-components/types/push-notification-type';

@Component({
  selector: 'app-bottom-sheet-example',
  imports: [
    ActionButtonComponent
  ],
  templateUrl: './bottom-sheet-example.component.html',
  styleUrl: './bottom-sheet-example.component.scss'
})
export class BottomSheetExampleComponent {

  constructor(private bottomSheetService: BottomSheetService) {
  }

  protected showBottomSheet(): void {
    const notifications: PushNotificationType [] = [
      {
        text: 'First notification example'
      },
      {
        text: 'Second notification example',
        link: '/support'
      }
    ]
    this.bottomSheetService.open(BottomSheetNotifyComponent, notifications)
  }
}
