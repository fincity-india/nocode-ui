import { StyleGroupDefinition, StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{
		name: 'supportTextDisabledColor',
		cssProperty: 'color',
		displayName: 'Application/Site Disabled font color',
		description: "This color is used for disabled textbox's support text.",
		defaultValue: '<form-input-text-color-when-disabled>',
		selector: '.supportText.disabled',
	},
	{
		name: 'supportTextErrorColor',
		cssProperty: 'color',
		displayName: 'Application/Site Error font color',
		description: "This color is used for error textbox's support text.",
		defaultValue: '<main-error-color>',
		selector: '.supportText.error',
	},
	{
		name: 'textBoxBorderColor',
		cssProperty: 'border-color',
		displayName: "textbox's border color",
		description: "This color is used for textbox's border color.",
		defaultValue: '#ebeaee',
		selector: '.textBoxDiv',
	},
	{
		name: 'textBoxBorderErrorColor',
		cssProperty: 'border-color',
		displayName: "textbox's border color on error",
		description: "This color is used for textbox's error border color.",
		defaultValue: '#ed6a5e',
		selector: '.textBoxDiv.error',
	},
	{
		name: 'textBoxBorderColorOnFocus',
		cssProperty: 'border-color',
		displayName: "textbox's border color on focus",
		description: "This color is used for textbox's focus border color.",
		defaultValue: '<main-focus-color>',
		selector: '.textBoxDiv.focussed',
	},
	{
		name: 'textBoxBorderColorWhenHasText',
		cssProperty: 'border-color',
		displayName: "textbox's border color with text",
		description: "This color is used for textbox's border color when it has text.",
		defaultValue: '#393a3c',
		selector: '.textBoxDiv.hasText',
	},
	{
		name: 'textBoxBorderColorWhenDisabled',
		cssProperty: 'border-color',
		displayName: "textbox's border color when disabled",
		description: "This color is used for textbox's border color when it is disabled.",
		defaultValue: '1px solid <main-disabled-color>',
		selector: '.textBoxDiv.textBoxDisabled',
	},
	{
		name: 'textBoxTextColorWhenDisabled',
		cssProperty: 'color',
		displayName: "textbox's border color when disabled",
		description: "This color is used for textbox's border color when it is disabled.",
		defaultValue: '<main-disabled-color>',
		selector: '.textBoxDiv.textBoxDisabled',
	},
	{
		name: 'textBoxLabelTextColor',
		cssProperty: 'color',
		displayName: "textbox's label color",
		description: "This color is used for textbox's label color.",
		defaultValue: '#393a3c',
		selector: '.textBoxDiv .inputContainer .textBoxLabel',
	},
	{
		name: 'textBoxLabelTextColorWhenDisabled',
		cssProperty: 'color',
		displayName: "textbox's label color when disabled",
		description: "This color is used for textbox's label color when it is disabled.",
		defaultValue: '<main-disabled-color>',
		selector: '.textBoxDiv .inputContainer .textBoxLabel.disabled',
	},
	{
		name: 'textBoxLabelTextColorWhenError',
		cssProperty: 'color',
		displayName: "textbox's label color when error",
		description: "This color is used for textbox's label color when it has error.",
		defaultValue: '<main-error-color>',
		selector: '.textBoxDiv .inputContainer .textBoxLabel.error',
	},
	{
		name: 'textBoxIconColorWhenError',
		cssProperty: 'color',
		displayName: "textbox's Error Icon color when error",
		description: "This color is used for textbox's error icon color when it has error",
		defaultValue: '<main-error-icon-color',
		selector: '.textBoxDiv .errorIcon',
	},
	{
		name: 'textBoxIconColorWhenTextPresent',
		cssProperty: 'color',
		displayName: "textbox's Error Icon Color",
		description:
			"This color is used for textbox's icon color when we input new data in textbox after error",
		defaultValue: '#393A3C',
		selector: '.textBoxDiv .errorIcon.hasText',
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
