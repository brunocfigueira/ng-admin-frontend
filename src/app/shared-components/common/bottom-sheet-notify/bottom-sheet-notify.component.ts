import {Component, inject, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {NgForOf, NgIf} from '@angular/common';
import {APP_CONST} from '../../../constants/app-constants';
import {MatCardModule} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {PushNotificationType} from '../../types/push-notification-type';
import {RouterLink} from '@angular/router';
import {MatListItem, MatNavList} from '@angular/material/list';

@Component({
  selector: 'app-bottom-sheet-notify',
  imports: [
    MatCardModule,
    MatIcon,
    NgForOf,
    RouterLink,
    NgIf,
    MatNavList,
    MatListItem
  ],
  templateUrl: './bottom-sheet-notify.component.html',
  styleUrl: './bottom-sheet-notify.component.scss'
})
export class BottomSheetNotifyComponent {
  protected readonly appConst = APP_CONST;

  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetNotifyComponent>>(MatBottomSheetRef);

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public notifications: PushNotificationType[]) {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
