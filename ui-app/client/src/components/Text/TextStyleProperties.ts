import { StyleGroupDefinition, StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{ displayName: 'Text Font', name: 'textFont', defaultValue: '<primaryFont>' },

	{
		groupName: 'SPAN',
		displayName: 'SPAN Font',
		name: 'spanTextFont',
		defaultValue: '<primaryFont>',
		cssProperty: 'font',
		selector: 'span',
	},
	{
		groupName: 'H1',
		displayName: 'H1 Font',
		name: 'h1TextFont',
		defaultValue: 'bold <quinaryFont>',
		cssProperty: 'font',
		selector: 'h1',
	},
	{
		groupName: 'H2',
		displayName: 'H2 Font',
		name: 'h2TextFont',
		defaultValue: '<quinaryFont>',
		cssProperty: 'font',
		selector: 'h2',
	},
	{
		groupName: 'H3',
		displayName: 'H3 Font',
		name: 'h3TextFont',
		defaultValue: 'bold <secondaryFont>',
		cssProperty: 'font',
		selector: 'h3',
	},
	{
		groupName: 'H4',
		displayName: 'H4 Font',
		name: 'h4TextFont',
		defaultValue: '<secondaryFont>',
		cssProperty: 'font',
		selector: 'h4',
	},
	{
		groupName: 'H5',
		displayName: 'H5 Font',
		name: 'h5TextFont',
		defaultValue: 'bold <tertiaryFont>',
		cssProperty: 'font',
		selector: 'h5',
	},
	{
		groupName: 'H6',
		displayName: 'H6 Font',
		name: 'h6TextFont',
		defaultValue: '<tertiaryFont>',
		cssProperty: 'font',
		selector: 'h6',
	},
	{
		groupName: 'I',
		displayName: 'I Font',
		name: 'iTextFont',
		defaultValue: 'italic <primaryFont>',
		cssProperty: 'font',
		selector: 'i',
	},
	{
		groupName: 'P',
		displayName: 'P Font',
		name: 'pTextFont',
		defaultValue: '<primaryFont>',
		cssProperty: 'font',
		selector: 'p',
	},
	{
		groupName: 'B',
		displayName: 'B Font',
		name: 'bTextFont',
		defaultValue: 'bold <primaryFont>',
		cssProperty: 'font',
		selector: 'b',
	},
	{
		groupName: 'PRE',
		displayName: 'PRE Font',
		name: 'preTextFont',
		defaultValue: '<primaryFont>',
		cssProperty: 'font',
		selector: 'pre',
	},

	{
		groupName: 'SPAN',
		displayName: 'SPAN Color',
		name: 'spanTextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'span',
	},
	{
		groupName: 'H1',
		displayName: 'H1 Color',
		name: 'h1TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h1',
	},
	{
		groupName: 'H2',
		displayName: 'H2 Color',
		name: 'h2TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h2',
	},
	{
		groupName: 'H3',
		displayName: 'H3 Color',
		name: 'h3TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h3',
	},
	{
		groupName: 'H4',
		displayName: 'H4 Color',
		name: 'h4TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h4',
	},
	{
		groupName: 'H5',
		displayName: 'H5 Color',
		name: 'h5TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h5',
	},
	{
		groupName: 'H6',
		displayName: 'H6 Color',
		name: 'h6TextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'h6',
	},
	{
		groupName: 'I',
		displayName: 'I Color',
		name: 'iTextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'i',
	},
	{
		groupName: 'P',
		displayName: 'P Color',
		name: 'pTextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'p',
	},
	{
		groupName: 'B',
		displayName: 'B Color',
		name: 'bTextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'p',
	},
	{
		groupName: 'PRE',
		displayName: 'PRE Color',
		name: 'preTextFontColor',
		defaultValue: '<fontColorOne>',
		cssProperty: 'color',
		selector: 'pre',
	},

	{
		groupName: 'SPAN',
		displayName: 'SPAN Padding',
		name: 'spanTextPadding',
		defaultValue: '0',
		cssProperty: 'padding',
		selector: 'span',
	},
	{
		groupName: 'H1',
		displayName: 'H1 Padding',
		name: 'h1TextPadding',
		defaultValue: '5px 0px',
		cssProperty: 'padding',
		selector: 'h1',
	},
	{
		groupName: 'H2',
		displayName: 'H2 Padding',
		name: 'h2TextPadding',
		defaultValue: '4px 0px',
		cssProperty: 'padding',
		selector: 'h2',
	},
	{
		groupName: 'H3',
		displayName: 'H3 Padding',
		name: 'h3TextPadding',
		defaultValue: '3px 0px',
		cssProperty: 'padding',
		selector: 'h3',
	},
	{
		groupName: 'H4',
		displayName: 'H4 Padding',
		name: 'h4TextPadding',
		defaultValue: '2px 0px',
		cssProperty: 'padding',
		selector: 'h4',
	},
	{
		groupName: 'H5',
		displayName: 'H5 Padding',
		name: 'h5TextPadding',
		defaultValue: '1px 0px',
		cssProperty: 'padding',
		selector: 'h5',
	},
	{
		groupName: 'H6',
		displayName: 'H6 Padding',
		name: 'h6TextPadding',
		defaultValue: '1px 0px',
		cssProperty: 'padding',
		selector: 'h6',
	},
	{
		groupName: 'I',
		displayName: 'I Padding',
		name: 'iTextPadding',
		defaultValue: '0',
		cssProperty: 'padding',
		selector: 'i',
	},
	{
		groupName: 'P',
		displayName: 'P Padding',
		name: 'pTextPadding',
		defaultValue: '0',
		cssProperty: 'padding',
		selector: 'p',
	},
	{
		groupName: 'B',
		displayName: 'B Padding',
		name: 'bTextPadding',
		defaultValue: '0',
		cssProperty: 'padding',
		selector: 'p',
	},
	{
		groupName: 'PRE',
		displayName: 'PRE Padding',
		name: 'preTextPadding',
		defaultValue: '0',
		cssProperty: 'padding',
		selector: 'pre',
	},

	{
		groupName: 'SPAN',
		displayName: 'SPAN Margin',
		name: 'spanTextMargin',
		defaultValue: '0',
		cssProperty: 'margin',
		selector: 'span',
	},
	{
		groupName: 'H1',
		displayName: 'H1 Margin',
		name: 'h1TextMargin',
		defaultValue: '5px 0px',
		cssProperty: 'margin',
		selector: 'h1',
	},
	{
		groupName: 'H2',
		displayName: 'H2 Margin',
		name: 'h2TextMargin',
		defaultValue: '4px 0px',
		cssProperty: 'margin',
		selector: 'h2',
	},
	{
		groupName: 'H3',
		displayName: 'H3 Margin',
		name: 'h3TextMargin',
		defaultValue: '3px 0px',
		cssProperty: 'margin',
		selector: 'h3',
	},
	{
		groupName: 'H4',
		displayName: 'H4 Margin',
		name: 'h4TextMargin',
		defaultValue: '2px 0px',
		cssProperty: 'margin',
		selector: 'h4',
	},
	{
		groupName: 'H5',
		displayName: 'H5 Margin',
		name: 'h5TextMargin',
		defaultValue: '1px 0px',
		cssProperty: 'margin',
		selector: 'h5',
	},
	{
		groupName: 'H6',
		displayName: 'H6 Margin',
		name: 'h6TextMargin',
		defaultValue: '1px 0px',
		cssProperty: 'margin',
		selector: 'h6',
	},
	{
		groupName: 'I',
		displayName: 'I Margin',
		name: 'iTextMargin',
		defaultValue: '0',
		cssProperty: 'margin',
		selector: 'i',
	},
	{
		groupName: 'P',
		displayName: 'P Margin',
		name: 'pTextMargin',
		defaultValue: '0',
		cssProperty: 'margin',
		selector: 'p',
	},
	{
		groupName: 'B',
		displayName: 'B Margin',
		name: 'bTextMargin',
		defaultValue: '0',
		cssProperty: 'margin',
		selector: 'p',
	},
	{
		groupName: 'PRE',
		displayName: 'PRE Margin',
		name: 'preTextMargin',
		defaultValue: '0',
		cssProperty: 'margin',
		selector: 'pre',
	},

	{
		groupName: 'SPAN',
		displayName: 'SPAN Text Decoration',
		name: 'spanTextDecoration',
		cssProperty: 'text-decoration',
		selector: 'span',
	},
	{
		groupName: 'H1',
		displayName: 'H1 Text Decoration',
		name: 'h1TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h1',
	},
	{
		groupName: 'H2',
		displayName: 'H2 Text Decoration',
		name: 'h2TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h2',
	},
	{
		groupName: 'H3',
		displayName: 'H3 Text Decoration',
		name: 'h3TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h3',
	},
	{
		groupName: 'H4',
		displayName: 'H4 Text Decoration',
		name: 'h4TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h4',
	},
	{
		groupName: 'H5',
		displayName: 'H5 Text Decoration',
		name: 'h5TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h5',
	},
	{
		groupName: 'H6',
		displayName: 'H6 Text Decoration',
		name: 'h6TextDecoration',
		cssProperty: 'text-decoration',
		selector: 'h6',
	},
	{
		groupName: 'I',
		displayName: 'I Text Decoration',
		name: 'iTextDecoration',
		cssProperty: 'text-decoration',
		selector: 'i',
	},
	{
		groupName: 'P',
		displayName: 'P Text Decoration',
		name: 'pTextDecoration',
		cssProperty: 'text-decoration',
		selector: 'p',
	},
	{
		groupName: 'B',
		displayName: 'B Text Decoration',
		name: 'bTextDecoration',
		cssProperty: 'text-decoration',
		selector: 'p',
	},
	{
		groupName: 'PRE',
		displayName: 'PRE Text Decoration',
		name: 'preTextDecoration',
		cssProperty: 'text-decoration',
		selector: 'pre',
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
