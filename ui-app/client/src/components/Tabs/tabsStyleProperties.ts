import { StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{
		groupName: 'Font',
		displayName: 'Tabs Name Font',
		name: 'tabsTitleFont',
		defaultValue: '<primaryFont>',
		cssProperty: 'font',
		selector: '.tabDiv',
	},

	{
		groupName: 'Background',
		displayName: 'Tab Child Container Background',
		name: 'tabChildContainerBackground',
		defaultValue: '<backgroundColorSeven>',
		cssProperty: 'background',
		selector: '.tabGridDiv',
	},
	{
		groupName: 'Background',
		displayName: 'Tabs Container Background',
		name: 'tabsContainerBackground',
		defaultValue: 'transparent',
		cssProperty: 'background',
		selector: '.tabsContainer',
	},

	{
		groupName: 'Gap',
		displayName: 'Tab Name Gap',
		name: 'tabNameGap',
		defaultValue: '5px',
		cssProperty: 'gap',
		selector: '.tabDiv',
	},
	{
		groupName: 'Padding',
		displayName: 'Tab Child Container Padding',
		name: 'tabChildContainerPadding',
		defaultValue: '5px',
		cssProperty: 'padding',
		selector: '.tabGridDiv',
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Horizontal Border',
		name: 'defaultTabHorizontalBorder',
		defaultValue: 'none',
		cssProperty: 'border',
		selector: '.comp.compTabs._default._horizontal .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Horizonatal Border',
		name: 'lineTabHorizonatalBorder',
		defaultValue: '2px solid, none, none, none',
		cssProperty: 'border',
		selector: '.comp.compTabs._line._horizontal .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Hightlight Tab Horizonatal Border',
		name: 'hightlightTabHorizonatalBorder',
		defaultValue: '4px solid transparent',
		cssProperty: 'border',
		selector: '.comp.compTabs._highlight._horizontal .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Vertical Border',
		name: 'defaultTabVerticalBorder',
		defaultValue: 'none',
		cssProperty: 'border',
		selector: '.comp.compTabs._default._vertical .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Vertical Border',
		name: 'lineTabVerticalBorder',
		defaultValue: 'none, none, none, 2px solid',
		cssProperty: 'border',
		selector: '.comp.compTabs._line._vertical .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Hightlight Tab Vertical Border',
		name: 'hightlightTabVerticalBorder',
		defaultValue: '4px solid transparent',
		cssProperty: 'border',
		selector: '.comp.compTabs._highlight._vertical .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Padding',
		name: 'defaultTabPadding',
		defaultValue: '3px 8px',
		cssProperty: 'padding',
		selector: '.comp.compTabs._default .tabDiv',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Padding',
		name: 'lineTabPadding',
		defaultValue: '3px 8px',
		cssProperty: 'padding',
		selector: '.comp.compTabs._line .tabDiv',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Hightlight Tab Padding',
		name: 'hightlightTabPadding',
		defaultValue: '8px 8px',
		cssProperty: 'padding',
		selector: '.comp.compTabs._highlight .tabDiv',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Background',
		name: 'defaultTabBackground',
		defaultValue: '<tabChildContainerBackground>',
		cssProperty: 'background',
		selector: '.comp.compTabs._default .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Background',
		name: 'lineTabBackground',
		defaultValue: '<tabChildContainerBackground>',
		cssProperty: 'background',
		selector: '.comp.compTabs._line .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Background',
		displayName: 'Primary Highlight Tab Background',
		name: 'primaryHighlightTabBackground',
		defaultValue: '<backgroundColorOne>',
		cssProperty: 'background',
		selector: '.comp.compTabs._highlight._primary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Background',
		displayName: 'Secondary Highlight Tab Background',
		name: 'secondaryHighlightTabBackground',
		defaultValue: '<backgroundColorTwo>',
		cssProperty: 'background',
		selector: '.comp.compTabs._highlight._secondary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Background',
		displayName: 'Tertiary Highlight Tab Background',
		name: 'tertiaryHighlightTabBackground',
		defaultValue: '<backgroundColorThree>',
		cssProperty: 'background',
		selector: '.comp.compTabs._highlight._tertiary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Background',
		displayName: 'Quaternary Highlight Tab Background',
		name: 'quaternaryHighlightTabBackground',
		defaultValue: '<backgroundColorFour>',
		cssProperty: 'background',
		selector: '.comp.compTabs._highlight._quaternary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Background',
		displayName: 'Quinary Highlight Tab Background',
		name: 'quinaryHighlightTabBackground',
		defaultValue: '<backgroundColorFive>',
		cssProperty: 'background',
		selector: '.comp.compTabs._highlight._quinary .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Vertical Border Radius',
		name: 'defaultTabVerticalBorderRadius',
		defaultValue: '3px 0px 0px 3px',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._default._vertical .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Vertical Border Radius',
		name: 'lineTabVerticalBorderRadius',
		defaultValue: 'none',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._line._vertical .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Hightlight Tab Vertical Border Radius',
		name: 'hightlightTabVerticalBorderRadius',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._highlight._vertical .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Horizontal Border Radius',
		name: 'defaultTabHorizontalBorderRadius',
		defaultValue: '3px 3px 0px 0px',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._default._horizontal .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Horizontal Border Radius',
		name: 'lineTabHorizontalBorderRadius',
		defaultValue: 'none',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._line._horizontal .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Hightlight Tab Horizontal Border Radius',
		name: 'hightlightTabHorizontalBorderRadius',
		defaultValue: '4px',
		cssProperty: 'border-radius',
		selector: '.comp.compTabs._highlight._horizontal .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Default',
		displayName: 'Default Tab Highlighter Scale',
		name: 'defaultTabHighlighterScale',
		cssProperty: 'transform',
		selector: '.comp.compTabs._default .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Line',
		displayName: 'Line Tab Highlighter Scale',
		name: 'lineTabHighlighterScale',
		cssProperty: 'transform',
		selector: '.comp.compTabs._line .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Highlight',
		displayName: 'Highlight Tab Highlighter Scale',
		name: 'highlightTabHighlighterScale',
		defaultValue: 'scale(0.8)',
		cssProperty: 'transform',
		selector: '.comp.compTabs._highlight .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Border Color',
		displayName: 'Primary Line Tab Border Color',
		name: 'primaryLineTabBorderColor',
		defaultValue: '<fontColorThree>',
		cssProperty: 'border-color',
		selector: '.comp.compTabs._line._primary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Border Color',
		displayName: 'Secondary Line Tab Border Color',
		name: 'secondaryLineTabBorderColor',
		defaultValue: '<fontColorFour>',
		cssProperty: 'border-color',
		selector: '.comp.compTabs._line._secondary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Border Color',
		displayName: 'Tertiary Line Tab Border Color',
		name: 'tertiaryLineTabBorderColor',
		defaultValue: '<fontColorFive>',
		cssProperty: 'border-color',
		selector: '.comp.compTabs._line._tertiary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Border Color',
		displayName: 'Quaternary Line Tab Border Color',
		name: 'quaternaryLineTabBorderColor',
		defaultValue: '<fontColorNine>',
		cssProperty: 'border-color',
		selector: '.comp.compTabs._line._quaternary .tabHighlighter',
		noPrefix: true,
	},
	{
		groupName: 'Border Color',
		displayName: 'Quinary Line Tab Border Color',
		name: 'quinaryLineTabBorderColor',
		defaultValue: '<fontColorSeven>',
		cssProperty: 'border-color',
		selector: '.comp.compTabs._line._quinary .tabHighlighter',
		noPrefix: true,
	},

	{
		groupName: 'Color',
		displayName: 'Primary Default n Line Tab Border Color',
		name: 'primaryDefaultnLineTabBorderColor',
		defaultValue: '<fontColorThree>',
		cssProperty: 'color',
		selector:
			'.comp.compTabs._line._primary .tabDiv._active, .comp.compTabs._default._primary .tabDiv._active',
		noPrefix: true,
	},
	{
		groupName: 'Color',
		displayName: 'Secondary Default n Line Tab Border Color',
		name: 'secondaryDefaultnLineTabBorderColor',
		defaultValue: '<fontColorFour>',
		cssProperty: 'color',
		selector:
			'.comp.compTabs._line._secondary .tabDiv._active, .comp.compTabs._default._secondary .tabDiv._active',
		noPrefix: true,
	},
	{
		groupName: 'Color',
		displayName: 'Tertiary Default n Line Tab Border Color',
		name: 'tertiaryDefaultnLineTabBorderColor',
		defaultValue: '<fontColorFive>',
		cssProperty: 'color',
		selector:
			'.comp.compTabs._line._tertiary .tabDiv._active, .comp.compTabs._default._tertiary .tabDiv._active',
		noPrefix: true,
	},
	{
		groupName: 'Color',
		displayName: 'Quaternary Default n Line Tab Border Color',
		name: 'quaternaryDefaultnLineTabBorderColor',
		defaultValue: '<fontColorNine>',
		cssProperty: 'color',
		selector:
			'.comp.compTabs._line._quaternary .tabDiv._active, .comp.compTabs._default._quaternary .tabDiv._active',
		noPrefix: true,
	},
	{
		groupName: 'Color',
		displayName: 'Quinary Default n Line Tab Border Color',
		name: 'quinaryDefaultnLineTabBorderColor',
		defaultValue: '<fontColorSeven>',
		cssProperty: 'color',
		selector:
			'.comp.compTabs._line._quinary .tabDiv._active, .comp.compTabs._default._quinary .tabDiv._active',
		noPrefix: true,
	},
];
export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
