import { SCHEMA_BOOL_COMP_PROP, SCHEMA_STRING_COMP_PROP, SCHEMA_VALIDATION } from '../../constants';
import {
	ComponentPropertyDefinition,
	ComponentPropertyEditor,
	ComponentPropertyGroup,
	ComponentStylePropertyGroupDefinition,
} from '../../types/common';

const COMMON_COMPONENT_PROPERTIES: { [key: string]: ComponentPropertyDefinition } = {
	onClick: {
		name: 'onClick',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'On Click',
		editor: ComponentPropertyEditor.EVENT_SELECTOR,
		description: 'Event to be triggered when clicked.',
		group: ComponentPropertyGroup.EVENTS,
	},
	onSelect: {
		name: 'onSelect',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'On Select',
		editor: ComponentPropertyEditor.EVENT_SELECTOR,
		description: 'Event to be triggered when selection.',
		group: ComponentPropertyGroup.EVENTS,
	},
	onEnter: {
		name: 'onEnter',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'On Enter',
		editor: ComponentPropertyEditor.EVENT_SELECTOR,
		description: 'Event to be triggered when enter is pressed.',
		group: ComponentPropertyGroup.EVENTS,
	},
	label: {
		name: 'label',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Label',
		description: 'Label to be displayed',
		translatable: true,
		group: ComponentPropertyGroup.BASIC,
		editor: ComponentPropertyEditor.TRANSLATABLE_PROP,
	},
	readOnly: {
		name: 'readOnly',
		schema: SCHEMA_BOOL_COMP_PROP,
		displayName: 'Read Only',
		description: 'This component will be rendered un editable when this property is true.',
		group: ComponentPropertyGroup.COMMON,
	},
	visibility: {
		name: 'visibility',
		schema: SCHEMA_BOOL_COMP_PROP,
		displayName: 'Visibility',
		description: 'This component will be hidden when this property is true.',
		group: ComponentPropertyGroup.COMMON,
	},
	validation: {
		name: 'validation',
		schema: SCHEMA_VALIDATION,
		displayName: 'Validation',
		description: 'Validation Rule',
		editor: ComponentPropertyEditor.VALIDATION,
		multiValued: true,
		group: ComponentPropertyGroup.VALIDATION,
	},
	linkTargetType: {
		name: 'target',
		schema: SCHEMA_STRING_COMP_PROP,
		group: ComponentPropertyGroup.ADVANCED,
		displayName: 'Link target',
		description:
			'Link taget type based on HTML link target, only applies when link path is given.',
	},
	linkPath: {
		name: 'linkPath',
		schema: SCHEMA_STRING_COMP_PROP,
		group: ComponentPropertyGroup.ADVANCED,
		displayName: 'Link path',
		description: 'Path that page needs to be redirected on click.',
		translatable: false,
	},
	linkTargetFeatures: {
		name: 'features',
		schema: SCHEMA_STRING_COMP_PROP,
		group: ComponentPropertyGroup.ADVANCED,
		displayName: 'Link target features',
		description: 'Link target features',
	},
	layout: {
		name: 'layout',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Layout',
		description: 'Name of the layout',
		editor: ComponentPropertyEditor.LAYOUT,
		defaultValue: 'SINGLECOLUMNLAYOUT',
		group: ComponentPropertyGroup.ADVANCED,
		enumValues: [
			{ name: 'ROWLAYOUT', displayName: 'Row Layout', description: 'Row layout' },
			{
				name: 'ROWCOLUMNLAYOUT',
				displayName: 'Row/Column Layout',
				description: 'Row/Column layout in mobile it truns to column. ',
			},
			{
				name: 'SINGLECOLUMNLAYOUT',
				displayName: 'Column Layout',
				description: 'Single Column layout in all resolutions',
			},
			{
				name: 'TWOCOLUMNSLAYOUT',
				displayName: 'Two Columns Layout',
				description: 'Two Columns layout in all resolutions except mobile',
			},
			{
				name: 'THREECOLUMNSLAYOUT',
				displayName: 'Three Columns Layout',
				description:
					'Three Columns layout in all resolutions and two in tablet and one in mobile',
			},
			{
				name: 'FOURCOLUMNSLAYOUT',
				displayName: 'Four Columns Layout',
				description:
					'Four Columns layout in desktop and widescreen and two in tablet and one in mobile',
			},
			{
				name: 'FIVECOLUMNSLAYOUT',
				displayName: 'Five Columns Layout',
				description:
					'Five Columns layout in desktop and widescreen and two in tablet and one in mobile',
			},
		],
	},
	datatype: {
		name: 'datatype',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Data Type/Format',
		description:
			'Expected format of the data, so that the processor can process the data correctly.',
		editor: ComponentPropertyEditor.ENUM,
		group: ComponentPropertyGroup.DATA,
		defaultValue: 'LIST_OF_STRINGS',
		enumValues: [
			{
				name: 'LIST_OF_STRINGS',
				displayName: 'List of strings',
				description: 'data has an array of strings',
			},
			{
				name: 'LIST_OF_OBJECTS',
				displayName: 'List of objects',
				description: 'data has an array of objects',
			},
			{
				name: 'LIST_OF_LISTS',
				displayName: 'List of lists',
				description: 'data has an array of arrays',
			},
			{
				name: 'OBJECT_OF_PRIMITIVES',
				displayName: 'Object of primitives',
				description: 'Object with key value pairs where values are primitives',
			},
			{
				name: 'OBJECT_OF_OBJECTS',
				displayName: 'Object of objects',
				description: 'Object with key value pairs where values are objects',
			},
			{
				name: 'OBJECT_OF_LISTS',
				displayName: 'Object of lists',
				description: 'Object with key value pairs where values are lists',
			},
		],
	},
	uniqueKeyType: {
		name: 'uniqueKeyType',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: "Unique key's type",
		description:
			'A key to identify every item uniquely in the list, RANDOM option creates a random id everytime',
		defaultValue: 'KEY',
		editor: ComponentPropertyEditor.ENUM,
		group: ComponentPropertyGroup.DATA,
		enumValues: [
			{
				name: 'KEY',
				displayName: 'Key',
				description: "Select key as unique key's value",
			},
			{
				name: 'INDEX',
				displayName: 'Index',
				description: "Select index as unique key's value",
			},
			{
				name: 'OBJECT',
				displayName: 'Object',
				description: "Select object as unique key's value",
			},
			{
				name: 'RANDOM',
				displayName: 'Random',
				description: 'A Random key is associated with value which is costly in rendering',
			},
		],
	},
	selectionType: {
		name: 'selectionType',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Selection value type',
		description: 'This is the value that is selected and stored on selection.',
		group: ComponentPropertyGroup.DATA,
		editor: ComponentPropertyEditor.ENUM,
		enumValues: [
			{
				name: 'KEY',
				displayName: 'Key',
				description: "Select key as selection key's value",
			},
			{
				name: 'INDEX',
				displayName: 'Index',
				description: "Select index as selection key's value",
			},
			{
				name: 'OBJECT',
				displayName: 'Object',
				description: "Select object as selection key's value",
			},
		],
	},
	labelKeyType: {
		name: 'labelKeyType',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Label type.',
		description:
			'This is the label that user sees on the scree, OBJECT works when value is primitive.',
		defaultValue: 'OBJECT',
		editor: ComponentPropertyEditor.ENUM,
		group: ComponentPropertyGroup.DATA,
		enumValues: [
			{
				name: 'KEY',
				displayName: 'Key',
				description: "Select key as label key's value",
			},
			{
				name: 'INDEX',
				displayName: 'Index',
				description: "Select index as label key's value",
			},
			{
				name: 'OBJECT',
				displayName: 'Object',
				description: "Select object as label key's value",
			},
		],
	},
	selectionKey: {
		name: 'selectionKey',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: "Selection key's value ",
		group: ComponentPropertyGroup.DATA,
		description:
			'Key value that is used to generate selection value when selection type is selected as KEY.',
	},

	uniqueKey: {
		name: 'uniqueKey',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: "Unique key's value ",
		description:
			'Key value that is used to get unique key value when unique key type is selected as KEY',
		group: ComponentPropertyGroup.DATA,
	},

	labelKey: {
		name: 'labelKey',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: "Labels key's value ",
		description:
			'Key value that is used to get label value when label key type is selected as KEY',
		group: ComponentPropertyGroup.DATA,
	},

	showInDesign: {
		name: 'showInDesign',
		schema: SCHEMA_BOOL_COMP_PROP,
		displayName: 'Show in Design Mode',
		group: ComponentPropertyGroup.BASIC,
		defaultValue: false,
	},
};

const COMPONENT_STYLE_GROUPS: { [key: string]: Array<string> } = {
	layout: ['display'],
	spacing: [
		'marginBottom',
		'marginLeft',
		'marginRight',
		'marginTop',
		'paddingBottom',
		'paddingLeft',
		'paddingRight',
		'paddingTop',
	],
	size: ['width', 'height', 'minHeight', 'minWidth', 'maxHeight', 'maxWidth'],
	position: ['bottom', 'left', 'right', 'top', 'position'],
	typography: [
		'fontFamily',
		'fontSize',
		'fontWeight',
		'color',
		'textAlign',
		'fontStyle',
		'lineHeight',
		'letterSpacing',
	],
	background: [
		'backgroundColor',
		'backgroundClip',
		'backgroundImage',
		'backgroundSize',
		'backgroundPosition',
		'backgroundPositionX',
		'backgroundPositionY',
		'backgroundRepeat',
	],

	border: [
		'borderTopLeftRadius',
		'borderTopRightRadius',
		'borderBottomLeftRadius',
		'borderBottomRightRadius',
		'borderStyle',
		'borderWidth',
		'borderColor',
	],
	effects: [
		'backgroundBlendMode',
		'opacity',
		'outlineColor',
		'outlineOffset',
		'outlineStyle',
		'outlineWidth',
		'boxShadow',
	],
	accentColor: ['accentColor'],
	image: ['imageOrientation', 'imageRendering', 'imageResolution'],
	shape: ['clipPath'],
	rotate: ['rotate'],
	list: ['listStyleImage', 'listStylePosition', 'listStyleType'],
	scrollbar: ['hideScrollBar'],
	selectorName: ['selectorName'],
};

const CSS_STYLE_PROPERTY_GROUP_REF: { [key: string]: string } = Object.entries(
	COMPONENT_STYLE_GROUPS,
).reduce((a: any, [grp, mems]) => {
	for (const x of mems) a[x] = grp;
	return a;
}, {});

const COMPONENT_STYLE_GROUP_PROPERTIES: { [key: string]: ComponentStylePropertyGroupDefinition } = {
	spacing: {
		name: 'spacing',
		type: 'spacing',
		displayName: 'Spacing',
		description: 'Spacing Properties',
		target: ['comp'],
	},
	typography: {
		name: 'typography',
		type: 'typography',
		displayName: 'Typography',
		description: 'Typography Properties',
		target: ['comp'],
		advanced: [
			'textIndent',
			'textTransform',
			'textShadow',
			'direction',
			'textDecoration',
			'textOrientation',
			'wordBreak',
			'wordSpacing',
			'wordWrap',
			'fontFeatureSettings',
			'fontKerning',
			'fontVariant',
			'fontVariantCaps',
			'textAlignLast',
			'textDecorationColor',
			'textDecorationLine',
			'textDecorationStyle',
			'textEmphasis',
			'textOverflow',
			'whiteSpace',
		],
	},
	position: {
		name: 'position',
		type: 'position',
		displayName: 'Position',
		description: 'Position Properties',
		target: ['comp'],
		advanced: ['float', 'clear', 'zIndex'],
	},
	layout: {
		name: 'layout',
		type: 'layout',
		displayName: 'Layout',
		description: 'Layout Properties',
		target: ['comp'],
		advanced: [
			'alignContent',
			'alignItems',
			'alignSelf',
			'justifyContent',
			'justifyItems',
			'justifySelf',
			'flex',
			'flexBasis',
			'flexDirection',
			'flexFlow',
			'flexGrow',
			'flexWrap',
			'gap',
		],
	},
	image: {
		name: 'image',
		type: 'image',
		displayName: 'Image',
		description: 'Image Properties',
		target: ['comp'],
		advanced: ['aspectRatio'],
	},
	accentColor: {
		name: 'accentColor',
		type: 'accentColor',
		displayName: 'Accent Color',
		description: 'Accent Color',
		target: ['comp'],
	},
	scrollbar: {
		name: 'scrollbar',
		type: 'scrollbar',
		displayName: 'Scroll Bar',
		description: 'Scroll Bar',
		target: ['comp'],
	},
	background: {
		name: 'background',
		type: 'background',
		displayName: 'Background',
		description: 'Background',
		target: ['comp'],
		advanced: ['backgroundAttachment', 'backgroundOrigin'],
	},
	border: {
		name: 'border',
		type: 'border',
		displayName: 'Border',
		description: 'Border',
		target: ['comp'],
		advanced: [
			'borderBottomColor',
			'borderBottomStyle',
			'borderBottomWidth',
			'borderCollapse',
			'borderEndEndRadius',
			'borderEndStartRadius',
			'borderImage',
			'borderImageOutset',
			'borderImageRepeat',
			'borderImageSlice',
			'borderImageSource',
			'borderImageWidth',
			'borderLeftColor',
			'borderLeftStyle',
			'borderLeftWidth',
			'borderRightColor',
			'borderRightStyle',
			'borderRightWidth',
			'borderSpacing',
			'borderStartEndRadius',
			'borderStartStartRadius',
			'borderTopColor',
			'borderTopStyle',
			'borderTopWidth',
		],
	},
	shape: {
		name: 'shape',
		type: 'shape',
		displayName: 'Shape',
		description: 'Shape',
		target: ['comp'],
	},
	list: {
		name: 'list',
		type: 'list',
		displayName: 'List',
		description: 'List',
		target: ['comp'],
	},
	rotate: {
		name: 'rotate',
		type: 'rotate',
		displayName: 'Rotate',
		description: 'Rotate',
		target: ['comp'],
	},
	size: {
		name: 'size',
		type: 'size',
		displayName: 'Size',
		description: 'Size',
		target: ['comp'],
		advanced: [
			'scale',
			'overflow',
			'overflowWrap',
			'overflowX',
			'overflowY',
			'objectFit',
			'objectPosition',
		],
	},
	effects: {
		name: 'effects',
		type: 'effects',
		displayName: 'Effects',
		description: 'Effects Properties',
		target: ['comp'],
		advanced: [
			'mixBlendMode',
			'transform',
			'transformStyle',
			'transitionProperty',
			'transitionDuration',
			'transitionTiming-function',
			'transitionDelay',
			'filter',
			'backdropFilter',
			'cursor',
			'transformOrigin',
		],
	},
	slectorName: {
		name: 'selectorName',
		type: 'selectorName',
		displayName: 'Selector Names',
		description: 'Selector Names',
		target: ['comp'],
	},
};

export {
	COMMON_COMPONENT_PROPERTIES,
	COMPONENT_STYLE_GROUP_PROPERTIES,
	CSS_STYLE_PROPERTY_GROUP_REF,
	COMPONENT_STYLE_GROUPS,
};
