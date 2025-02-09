export type ActionButtonType =
  'custom'
  | 'yes'
  | 'no'
  | 'new'
  | 'save'
  | 'update'
  | 'delete'
  | 'send'
  | 'cancel'
  | 'clear'
  | 'search'
  | undefined;

export type ActionButtonAttributeType = {
  showIcon: boolean;
  showLabel: boolean;
  showToolTip: boolean;
  action: ActionButtonType;
  toolTipButton: string;
  label: string;
  icon: string;
}
export type AttributeType = 'button' | 'submit' | 'reset';
