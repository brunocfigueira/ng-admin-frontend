import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../../shared-components/common/snackbar/snackbar.component';
import {APP_CONST} from '../../constants/app-constants';

@Injectable({
  providedIn: 'root',
})
export class OutputService {
  constructor(private snackBar: MatSnackBar) {
  }

  private showShortMessage(
    message: string,
    color: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default',
    duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME,
    icon: string = 'close',
    position: { horizontal?: 'start' | 'center' | 'end' | 'left' | 'right'; vertical?: 'top' | 'bottom' } = {
      horizontal: 'center',
      vertical: 'top'
    }
  ) {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: position.horizontal,
      verticalPosition: position.vertical,
      panelClass: [`snackbar-${color}`],
      data: {message, icon, color},
    };

    this.snackBar.openFromComponent(SnackbarComponent, config);
  }

  showShortMessageSuccess(message: string, duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME) {
    this.showShortMessage(message, 'success', duration);
  }

  showShortMessageError(message: string, duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME) {
    this.showShortMessage(message, 'error', duration);
  }

  showShortMessageWarning(message: string, duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME) {
    this.showShortMessage(message, 'warning', duration);
  }

  showShortMessageInfo(message: string, duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME) {
    this.showShortMessage(message, 'info', duration);
  }

  showShortMessageDefault(message: string, duration: number = APP_CONST.SNACKBAR.DISPLAY_TIME) {
    this.showShortMessage(message, 'default', duration);
  }
}
