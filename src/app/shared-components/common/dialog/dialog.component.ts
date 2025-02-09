import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommonModule, NgForOf} from '@angular/common';
import {APP_CONST} from '../../../constants/app-constants';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {DialogActionButtonsType} from '../../types/dialog-type';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgForOf,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltip
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  protected readonly appConst = APP_CONST;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  protected onClose(): void {
    this.dialogRef.close();
  }

  protected onAction(action: DialogActionButtonsType): void {
    if (action.callback) {
      action.callback();
    }
    this.dialogRef.close();
  }
}
