import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatIcon} from '@angular/material/icon';
import {APP_CONST} from '../../../constants/app-constants'
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatTooltipModule,
    MatIcon,
    NgIf,
    MatIconButton
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.css'
})
export class SnackbarComponent {

  protected readonly appConst = APP_CONST;

  constructor(
    private snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
  }

  protected close(): void {
    this.snackBarRef.dismiss();
  }

  protected displayIcon(): string {
    let icon = '';
    switch (this.data.color.toLowerCase()) {
      case 'success':
        icon = this.appConst.SNACKBAR.ICON.SUCCESS;
        break
      case 'error':
        icon = this.appConst.SNACKBAR.ICON.ERROR;
        break
      case 'warning':
        icon = this.appConst.SNACKBAR.ICON.WARNING;
        break
      case 'info':
        icon = this.appConst.SNACKBAR.ICON.INFO;
        break
      default:
        break;
    }
    return icon;
  }

  protected hasIcon(): boolean {
    return this.displayIcon().length > 0;
  }
}
