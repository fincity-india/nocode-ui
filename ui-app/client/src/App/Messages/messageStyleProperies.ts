import { StyleGroupDefinition, StylePropertyDefinition } from '../../types/common';

export const styleProperties: Array<StylePropertyDefinition> = [
	{
		name: 'messagesOuterContainerLeft',
		cssProperty: 'left',
		displayName: 'Messages Outer Container Left',
		description: 'Messages Outer Container position on the page left',
		defaultValue: '10px',
		selector: ' ',
	},
	{
		name: 'messagesOuterContainerRight',
		cssProperty: 'right',
		displayName: 'Messages Outer Container Right',
		description: 'Messages Outer Container position on the page right',
		selector: ' ',
	},
	{
		name: 'messagesOuterContainerTop',
		cssProperty: 'top',
		displayName: 'Messages Outer Container Top',
		description: 'Messages Outer Container position on the page top',
		selector: ' ',
	},
	{
		name: 'messagesOuterContainerBottom',
		cssProperty: 'bottom',
		displayName: 'Messages Outer Container Bottom',
		description: 'Messages Outer Container position on the page bottom',
		defaultValue: '10px',
		selector: ' ',
	},
	{
		name: 'messageContainerWidth',
		cssProperty: 'width',
		displayName: 'Messages Container Width',
		description: 'Messages Container width',
		defaultValue: '30vw',
		selector: '._message',
	},
	{
		name: 'messageContainerGap',
		cssProperty: 'gap',
		displayName: 'Messages Container item gap',
		description: 'Messages Container item gap',
		defaultValue: '10px',
		selector: '._message',
	},
	{
		name: 'messageContainerBackground',
		cssProperty: 'background',
		displayName: 'Messages Container Background',
		description: 'Messages Container background',
		defaultValue: '<secondary-background>',
		selector: '._message',
	},
	{
		name: 'messageContainerBorderRadius',
		cssProperty: 'border-radius',
		displayName: 'Message Container border radius',
		description: 'Message Container border radius',
		defaultValue: '0px 4px 4px 0px',
		selector: '._message',
	},
	{
		name: 'messageContainerPadding',
		cssProperty: 'padding',
		displayName: 'Messages Container Padding',
		description: 'Messages Container padding',
		defaultValue: '10px',
		selector: '._message',
	},
	{
		name: 'messageFontSize',
		cssProperty: 'font-size',
		displayName: 'Message Font Size',
		description: 'Message Font Size',
		defaultValue: 'calc(<main-font-size> - 1px)',
		selector: '._message ._msgString',
	},
	{
		name: 'messageBorderLeft',
		cssProperty: 'border-left',
		displayName: 'Message Container Border Left',
		description: 'Message Container Border Left',
		defaultValue: '7px solid',
		selector: '._message ',
	},
	{
		name: 'messagesGap',
		cssProperty: 'gap',
		displayName: 'Gap between messages',
		description: 'Gap between messages',
		defaultValue: '10px',
		selector: ' ',
	},
	{
		name: 'messageErrorColor',
		cssProperty: 'color',
		displayName: 'Message error color',
		description: 'Message error color',
		defaultValue: '#ed6a5e',
		selector: '._message.ERROR ._msgString, ._message.ERROR i',
	},
	{
		name: 'messageWarningColor',
		cssProperty: 'color',
		displayName: 'Message warning color',
		description: 'Message warning color',
		defaultValue: '#e5d122',
		selector: '._message.WARNING ._msgString, ._message.WARNING i',
	},
	{
		name: 'messageInformationColor',
		cssProperty: 'color',
		displayName: 'Message information color',
		description: 'Message information color',
		defaultValue: '#059',
		selector: '._message.INFORMATION ._msgString, ._message.INFORMATION i',
	},
	{
		name: 'messageSuccessColor',
		cssProperty: 'color',
		displayName: 'Message success color',
		description: 'Message success color',
		defaultValue: '#270',
		selector: '._message.SUCCESS ._msgString, ._message.SUCCESS i',
	},
	{
		name: 'messageErrorBorderColor',
		cssProperty: 'border-color',
		displayName: 'Message error border color',
		description: 'Message error border color',
		defaultValue: '#ed6a5e',
		selector: '._message.ERROR',
	},
	{
		name: 'messageWarningBorderolor',
		cssProperty: 'border-color',
		displayName: 'Message warning border color',
		description: 'Message warning border color',
		defaultValue: '#e5d122',
		selector: '._message.WARNING',
	},
	{
		name: 'messageInformationBorderColor',
		cssProperty: 'border-color',
		displayName: 'Message information border color',
		description: 'Message information border color',
		defaultValue: '#059',
		selector: '._message.INFORMATION',
	},
	{
		name: 'messageSuccessBorderColor',
		cssProperty: 'border-color',
		displayName: 'Message success border color',
		description: 'Message success border color',
		defaultValue: '#270',
		selector: '._message.SUCCESS',
	},
];

export const styleDefaults = new Map<string, string>(
	styleProperties
		.filter(e => !!e.defaultValue)
		.map(({ name, defaultValue }) => [name, defaultValue!]),
);
