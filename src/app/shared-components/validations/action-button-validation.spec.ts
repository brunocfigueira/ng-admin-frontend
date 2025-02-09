import {ActionButtonValidation} from './action-button-validation';
import {ActionButtonAttributeType, ActionButtonType} from '../types/action-button-type';

describe('ActionButtonValidation', () => {
    const createValidAttributes = (overrides: Partial<ActionButtonAttributeType> = {}): ActionButtonAttributeType => ({
        showIcon: true,
        showLabel: true,
        showToolTip: true,
        action: 'custom',
        toolTipButton: 'ValidToolTip',
        label: 'ValidLabel',
        icon: 'ValidIcon',
        ...overrides,
    });

    it('should throw error if both showIcon and showLabel are false', () => {
        const attributes = createValidAttributes({showIcon: false, showLabel: false});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.ICON_AND_LABEL_FALSE
        );
    });

    it('should throw error if showToolTip is true and action is "custom" without toolTipButton', () => {
        const attributes = createValidAttributes({toolTipButton: ''});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.TOOLTIP_CUSTOM
        );
    });

    it('should throw error if showLabel is true and action is "custom" without label', () => {
        const attributes = createValidAttributes({label: ''});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.LABEL_CUSTOM
        );
    });

    it('should throw error if showIcon is true and action is "custom" without icon', () => {
        const attributes = createValidAttributes({icon: ''});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.ICON_CUSTOM
        );
    });

    it('should throw error if action is not "custom" and label is defined', () => {
        const attributes = createValidAttributes({action: 'save', label: 'InvalidLabel'});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.LABEL_NOT_CUSTOM
        );
    });

    it('should throw error if action is not "custom" and icon is defined', () => {
        const attributes = createValidAttributes({action: 'update',label:'', icon: 'InvalidIcon'});

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.ICON_NOT_CUSTOM
        );
    });

    it('should throw error if action is not "custom" and toolTipButton is defined', () => {
        const attributes = createValidAttributes({
            action: 'delete',
            label: '',
            icon: '',
            toolTipButton: 'InvalidToolTip'
        });

        expect(() => ActionButtonValidation.validate(attributes)).toThrowError(
            ActionButtonValidation.ERRORS.TOOLTIP_NOT_CUSTOM
        );
    });

    it('should pass validation for valid attributes with action "custom"', () => {
        const attributes = createValidAttributes();

        expect(() => ActionButtonValidation.validate(attributes)).not.toThrow();
    });

    it('should pass validation for valid attributes with action not "custom"', () => {
        const attributes = createValidAttributes({
            action: 'save',
            showToolTip: false,
            toolTipButton: '',
            label: '',
            icon: '',
        });

        expect(() => ActionButtonValidation.validate(attributes)).not.toThrow();
    });
});
