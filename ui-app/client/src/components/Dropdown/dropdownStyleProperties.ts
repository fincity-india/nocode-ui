import { StyleGroupDefinition, StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	// label text style
	{
		name: 'labelTextFontColor',
		cssProperty: 'color',
		displayName: 'Font color for Header Text',
		description: 'Font color for Header Text.',
		defaultValue: '#1F3C3D',
		selector: '.label',
	},
	{
		name: 'labelTextFontColorDisabled',
		cssProperty: 'color',
		displayName: 'Font color when Header Text is disable',
		description: 'Font color for Header Text when it is disable.',
		defaultValue: '#798A8B',
		selector: '.label.disabled',
	},
	// container style
	{
		name: 'containerWidth',
		cssProperty: 'width',
		displayName: 'Container width',
		description: 'The width of Container.',
		defaultValue: '100%',
		selector: '.container',
	},
	{
		name: 'containerHeight',
		cssProperty: 'height',
		displayName: 'Container height',
		description: 'The height of Container.',
		defaultValue: '56px',
		selector: '.container',
	},
	{
		name: 'containerPadding',
		cssProperty: 'padding',
		displayName: 'Container padding',
		description: 'The padding of Container.',
		defaultValue: '0 16px',
		selector: '.container',
	},
	{
		name: 'containerBorder',
		cssProperty: 'border',
		displayName: 'Container border',
		description: 'The border of Container.',
		defaultValue: '1px solid #C7C8D6',
		selector: '.container',
	},
	{
		name: 'containerBorderRadius',
		cssProperty: 'border-radius',
		displayName: 'Container border radius',
		description: 'The border radius of Container.',
		defaultValue: '4px',
		selector: '.container',
	},
	{
		name: 'containerBorderHover',
		cssProperty: 'border',
		displayName: 'Container border on hover',
		description: 'The border of Container on hover.',
		defaultValue: '1px solid #2680EB',
		selector: '.container:hover',
	},
	{
		name: 'containerBorderFocus',
		cssProperty: 'border',
		displayName: 'Container border on Focus',
		description: 'The border of Container on Focus.',
		defaultValue: '1px solid #2680EB',
		selector: '.container.focus',
	},
	{
		name: 'containerBorderDisabled',
		cssProperty: 'border',
		displayName: 'Container border on disabled',
		description: 'The border of Container on disabled.',
		defaultValue: '1px solid #DDDEE6',
		selector: '.container.disabled',
	},
	{
		name: 'containerBorderDisabledHover',
		cssProperty: 'border',
		displayName: 'Container border on disabled',
		description: 'The border of Container on hover when disabled.',
		defaultValue: '1px solid #DDDEE6',
		selector: '.container.disabled:hover',
	},
	// placeholder style
	{
		name: 'placeholderFontColor',
		cssProperty: 'color',
		displayName: 'Font color for Placeholder Text',
		description: 'Font color for Placeholder Text.',
		defaultValue: '#6C7586',
		selector: '.placeholder',
	},
	{
		name: 'placeholderFontColorWhenSelected',
		cssProperty: 'color',
		displayName: 'Font color for Placeholder Text on selection.',
		description: 'Font color for Placeholder Text when an option is selected',
		defaultValue: '#1F3C3D',
		selector: '.placeholder.selected',
	},
	{
		name: 'placeholderFontColorDisabled',
		cssProperty: 'color',
		displayName: 'Font color when Placeholder Text is disable',
		description: 'Font color for Placeholder Text when it is disable.',
		defaultValue: '#A7ACB6',
		selector: '.container.disabled .placeholder',
	},
	{
		name: 'placeholderFontColorWhenSelectedDisabled',
		cssProperty: 'color',
		displayName: 'Font color for Placeholder Text on selection when disabled',
		description: 'Font color for Placeholder Text on selection when it is disable.',
		defaultValue: '#798A8B',
		selector: '.container.disabled .placeholder.selected',
	},
	{
		name: 'placeholderIconColor',
		cssProperty: 'color',
		displayName: 'Font color for Placeholder Icon',
		description: 'Font color for Placeholder Icon.',
		defaultValue: '#1F3C3D',
		selector: '.placeholderIcon',
	},
	{
		name: 'placeholderIconColorDisabled',
		cssProperty: 'color',
		displayName: 'Font color for Placeholder Icon when disabled',
		description: 'Font color for Placeholder Icon when it is disable.',
		defaultValue: '#798A8B',
		selector: '.container.disabled .placeholderIcon',
	},
	// floating label style
	{
		name: 'floatingLabelFontColor',
		cssProperty: 'color',
		displayName: 'Font color for Floating Label',
		description: 'Font color for Floating Label.',
		defaultValue: '#6C7586',
		selector: '.labelFloat',
	},
	{
		name: 'floatingLabelFontColorDisabled',
		cssProperty: 'color',
		displayName: 'Font color for Floating Label when disabled',
		description: 'Font color for Floating Label when it is disable.',
		defaultValue: '#A7ACB6',
		selector: '.container.disabled .labelFloat',
	},
	// dropdown container style
	{
		name: 'dropdownContainerWidth',
		cssProperty: 'width',
		displayName: 'Dropdown Container width',
		description: 'The width of Dropdown Container.',
		defaultValue: '100%',
		selector: '.dropdownContainer',
	},
	{
		name: 'dropdownContainerMaxHeight',
		cssProperty: 'max-height',
		displayName: 'Dropdown Container max height',
		description: 'The max height of Dropdown Container.',
		defaultValue: '150px',
		selector: '.dropdownContainer',
	},
	{
		name: 'dropdownContainerPadding',
		cssProperty: 'padding',
		displayName: 'Dropdown Container padding',
		description: 'The padding of Dropdown Container.',
		defaultValue: '8px 0',
		selector: '.dropdownContainer',
	},
	{
		name: 'dropdownContainerBackgroundColor',
		cssProperty: 'background-color',
		displayName: 'Dropdown Container background color',
		description: 'The background color of Dropdown Container.',
		defaultValue: '#FFF',
		selector: '.dropdownContainer',
	},
	{
		name: 'dropdownContainerBoxShadow',
		cssProperty: 'box-shadow',
		displayName: 'Dropdown Container box shadow',
		description: 'The box shadow of Dropdown Container.',
		defaultValue: '0 4px 6px 1px #E6E6E6',
		selector: '.dropdownContainer',
	},
	// dropdown Item style
	{
		name: 'dropdownItemPadding',
		cssProperty: 'padding',
		displayName: 'Dropdown Item padding',
		description: 'The padding of Dropdown Item.',
		defaultValue: '8px 16px',
		selector: '.dropdownItem',
	},
	{
		name: 'dropdownItemBackgroundColorOnHover',
		cssProperty: 'background-color',
		displayName: 'Dropdown Item background color on hover',
		description: 'The background color of Dropdown Item on hover.',
		defaultValue: '#F4F6F6',
		selector: '.dropdownItem:hover',
	},
	{
		name: 'dropdownItemLabelFontColor',
		cssProperty: 'color',
		displayName: 'Font color for Dropdown Item Label',
		description: 'Font color for Dropdown Item Label.',
		defaultValue: '#1F3C3D',
		selector: '.dropdownItemLabel',
	},
	{
		name: 'checkedIconFontColor',
		cssProperty: 'color',
		displayName: 'Font color for Checked Icon',
		description: 'Font color for Checked Icon.',
		defaultValue: '#2680EB',
		selector: '.checkedIcon',
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
