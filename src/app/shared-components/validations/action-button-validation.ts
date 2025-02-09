import {Injectable} from '@angular/core';
import {ActionButtonAttributeType} from '../types/action-button-type';


@Injectable({
  providedIn: 'root'
})
export class ActionButtonValidation {
  static readonly ERRORS = {
    ICON_AND_LABEL_FALSE: 'To use "ActionButtonComponent" it is not allowed to set "[showIcon]=false" and "[showLabel]=false"',
    TOOLTIP_CUSTOM: 'To use "ActionButtonComponent" with the parameter "[showToolTip]=true" and "[action]=custom" it is mandatory to define "[toolTipText]=SomeTextTip"',
    LABEL_CUSTOM: 'To use "ActionButtonComponent" with the parameter "[showLabel]=true" and "[action]=custom" it is mandatory to define "[label]=SomeLabel"',
    ICON_CUSTOM: 'To use "ActionButtonComponent" with the parameter "[showIcon]=true" and "[action]=custom" it is mandatory to define "[icon]=SomeIconValidMaterialDesign"',
    LABEL_NOT_CUSTOM: '"ActionButtonComponent" remove the parameter "[label]=SomeLabel" when using "action" other than "custom"',
    ICON_NOT_CUSTOM: '"ActionButtonComponent" remove the parameter "[icon]=SomeIcon" when using "action" other than "custom"',
    TOOLTIP_NOT_CUSTOM: '"ActionButtonComponent" remove the parameter "[toolTipButton]=SomeText" when using "action" other than "custom"',
  };

  static validate(attributeType: ActionButtonAttributeType): void {
    if (!attributeType.showIcon && !attributeType.showLabel) {
      throw new Error(this.ERRORS.ICON_AND_LABEL_FALSE);
    }
    if (attributeType.showToolTip && attributeType.action === 'custom' && !attributeType.toolTipButton) {
      throw new Error(this.ERRORS.TOOLTIP_CUSTOM);
    }
    if (attributeType.showLabel && attributeType.action === 'custom' && !attributeType.label) {
      throw new Error(this.ERRORS.LABEL_CUSTOM);
    }
    if (attributeType.showIcon && attributeType.action === 'custom' && !attributeType.icon) {
      throw new Error(this.ERRORS.ICON_CUSTOM);
    }
    if (attributeType.action !== 'custom' && attributeType.label) {
      throw new Error(this.ERRORS.LABEL_NOT_CUSTOM);
    }
    if (attributeType.action !== 'custom' && attributeType.icon) {
      throw new Error(this.ERRORS.ICON_NOT_CUSTOM);
    }
    if (attributeType.action !== 'custom' && attributeType.toolTipButton) {
      throw new Error(this.ERRORS.TOOLTIP_NOT_CUSTOM);
    }
  }
}
