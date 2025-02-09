import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {APP_CONST} from '../../../constants/app-constants';
import {ActionButtonAttributeType, ActionButtonType, AttributeType} from '../../types/action-button-type';
import {MatLabel} from '@angular/material/form-field';
import {NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {ActionButtonValidation} from '../../validations/action-button-validation';

@Component({
  selector: 'app-action-button',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatLabel,
    NgIf,
    MatTooltip,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgClass
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent implements OnInit {

  protected readonly appConst = APP_CONST;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() showToolTip: boolean = false;
  @Input() showIcon: boolean = false;
  @Input() showLabel: boolean = true;
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() toolTipButton: string = '';
  @Input() disabled: boolean = false;
  @Input() action: ActionButtonType;
  @Input() type: AttributeType = 'button';

  protected btnLabel: string = '';
  protected btnIcon: string = '';
  protected btnToolTip: string = '';
  protected btnClass: string = '';
  protected btnVariant: string = 'mat-raised-button';

  ngOnInit() {
    this.validateAttributes();
    this.configureAttributes();
  }

  private validateAttributes(): void {
    const attributeTypes: ActionButtonAttributeType = {
      showIcon: this.showIcon,
      showLabel: this.showLabel,
      showToolTip: this.showToolTip,
      action: this.action,
      toolTipButton: this.toolTipButton,
      label: this.label,
      icon: this.icon
    };
    ActionButtonValidation.validate(attributeTypes);
  }

  protected eventClick(): void {
    this.onClick.emit();
  }

  protected configureAttributes(): void {
    switch (this.action) {
      case "yes":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.YES;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.YES;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.YES;
        this.btnClass = 'btn-yes'
        this.btnVariant = 'mat-raised-button';
        break;
      case "no":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.NO;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.NO;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.NO;
        this.btnClass = 'btn-no'
        this.btnVariant = 'mat-raised-button';
        break;
      case "search":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.SEARCH;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.SEARCH;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.SEARCH;
        this.btnClass = 'btn-search'
        this.btnVariant = 'mat-raised-button';
        break;
      case "new":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.NEW;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.NEW;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.NEW;
        this.btnClass = 'btn-new'
        this.btnVariant = 'mat-raised-button';
        break;
      case "update":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.UPDATE;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.UPDATE;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.UPDATE;
        this.btnClass = 'btn-update';
        this.btnVariant = 'mat-raised-button';
        break;
      case "send":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.SEND;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.SEND;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.SEND;
        this.btnClass = 'btn-send';
        this.btnVariant = 'mat-raised-button';
        break;
      case "save":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.SAVE;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.SAVE;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.SAVE;
        this.btnClass = 'btn-save';
        this.btnVariant = 'mat-raised-button';
        break;
      case "delete":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.DELETE;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.DELETE;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.DELETE;
        this.btnClass = 'btn-delete';
        this.btnVariant = 'mat-raised-button';
        break;
      case "cancel":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.CANCEL;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.CANCEL;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.CANCEL;
        this.btnClass = 'btn-cancel';
        this.btnVariant = 'mat-button';
        break;
      case "clear":
        this.btnLabel = this.appConst.ACTION_BUTTON.LABEL.CLEAR;
        this.btnIcon = this.appConst.ACTION_BUTTON.ICON.CLEAR;
        this.btnToolTip = this.appConst.ACTION_BUTTON.TOOLTIP.CLEAR;
        this.btnClass = 'btn-clear'
        this.btnVariant = 'mat-button';
        break;
      case "custom":
        this.btnLabel = this.label;
        this.btnIcon = this.icon;
        this.btnToolTip = this.toolTipButton;
        this.btnClass = 'btn-custom';
        this.btnVariant = 'mat-raised-button';
        break;
      default:
        this.btnLabel = '';
        this.btnIcon = this.icon;
        this.btnToolTip = this.toolTipButton;
        this.btnVariant = 'mat-raised-button';
        break;
    }
    if (!this.showToolTip) {
      this.btnToolTip = '';
    }
    if (!this.showLabel && this.showIcon) {
      this.btnVariant = 'mat-icon-button';
    }
  }
}
