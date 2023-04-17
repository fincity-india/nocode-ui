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
		group: ComponentPropertyGroup.IMPORTANT,
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
	layout: {
		name: 'layout',
		schema: SCHEMA_STRING_COMP_PROP,
		displayName: 'Layout',
		description: 'Name of the layout',
		editor: ComponentPropertyEditor.LAYOUT,
		defaultValue: 'SINGLECOLUMNLAYOUT',
		group: ComponentPropertyGroup.ADVANCED,
		enumValues: [
			{ name: 'ROWLAYOUT', displayName: 'Row Layout', description: 'Default row layout' },
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
		defaultValue: 'LIST_OF_STRINGS',
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
		defaultValue: 'LIST_OF_STRINGS',
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
};

const COMPONENT_STYLE_GROUPS: { [key: string]: Array<string> } = {
	accentColor: ['accentColor'],
	backdropFilter: ['backdropFilter'],
	image: ['imageOrientation', 'imageRendering', 'imageResolution', 'objectFit', 'objectPosition'],
	background: [
		'backgroundBlendMode',
		'backgroundClip',
		'backgroundColor',
		'backgroundImage',
		'backgroundOrigin',
		'backgroundPosition',
		'backgroundPositionX',
		'backgroundPositionY',
		'backgroundRepeat',
		'backgroundSize',
	],
	border: [
		'borderBottom',
		'borderBottomColor',
		'borderBottomLeftRadius',
		'borderBottomRightRadius',
		'borderBottomStyle',
		'borderBottomWidth',
		'borderCollapse',
		'borderColor',
		'borderEndEndRadius',
		'borderEndStartRadius',
		'borderImage',
		'borderImageOutset',
		'borderImageRepeat',
		'borderImageSlice',
		'borderImageSource',
		'borderImageWidth',
		'borderLeft',
		'borderLeftColor',
		'borderLeftStyle',
		'borderLeftWidth',
		'borderRadius',
		'borderRight',
		'borderRightColor',
		'borderRightStyle',
		'borderRightWidth',
		'borderSpacing',
		'borderStartEndRadius',
		'borderStartStartRadius',
		'borderStyle',
		'borderTop',
		'borderTopColor',
		'borderTopLeftRadius',
		'borderTopRightRadius',
		'borderTopStyle',
		'borderTopWidth',
		'borderWidth',
	],
	boxShadow: ['boxShadow'],
	shape: ['clipPath'],
	color: ['color'],
	container: ['overflow', 'overflowWrap', 'overflowX', 'overflowY'],
	flex: [
		'alignContent',
		'alignItems',
		'alignSelf',
		'justifyContent',
		'flex',
		'flexBasis',
		'flexDirection',
		'flexFlow',
		'flexGrow',
		'flexWrap',
		'gap',
	],
	font: [
		'direction',
		'fontFamily',
		'fontFeatureSettings',
		'fontKerning',
		'fontSize',
		'fontStyle',
		'fontVariant',
		'fontVariantCaps',
		'fontWeight',
		'letterSpacing',
		'lineHeight',
		'textAlign',
		'textAlignLast',
		'textDecoration',
		'textDecorationColor',
		'textDecorationLine',
		'textDecorationStyle',
		'textEmphasis',
		'textIndent',
		'textOrientation',
		'textOverflow',
		'textShadow',
		'textTransform',
		'whiteSpace',
		'wordBreak',
		'wordSpacing',
		'wordWrap',
	],
	margin: ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
	opacity: ['opacity'],
	outline: ['outlineColor', 'outlineOffset', 'outlineStyle', 'outlineWidth'],
	padding: ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
	position: ['bottom', 'left', 'right', 'top', 'translateX', 'translateY', 'position'],
	rotate: ['rotate'],
	size: ['width', 'height', 'minHeight', 'minWidth', 'maxHeight', 'maxWidth', 'scale'],
	transform: ['transform', 'transformOrigin', 'transformStyle'],
	zIndex: ['zIndex'],
	list: ['listStyleImage', 'listStylePosition', 'listStyleType'],
	scrollbar: ['hideScrollBar'],
};

const CSS_STYLE_PROPERTY_GROUP_REF: { [key: string]: string } = Object.entries(
	COMPONENT_STYLE_GROUPS,
).reduce((a: any, [grp, mems]) => {
	for (const x of mems) a[x] = grp;
	return a;
}, {});

const COMPONENT_STYLE_GROUP_PROPERTIES: { [key: string]: ComponentStylePropertyGroupDefinition } = {
	image: {
		name: 'image',
		type: 'image',
		displayName: 'Image Properties',
		description: 'Image Properties',
		target: ['comp'],
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
	backdropFilter: {
		name: 'backdropFilter',
		type: 'backdropFilter',
		displayName: 'Backdrop Filter',
		description: 'Backdrop Filter',
		target: ['comp'],
	},
	background: {
		name: 'background',
		type: 'background',
		displayName: 'Background',
		description: 'Background',
		target: ['comp'],
	},
	border: {
		name: 'border',
		type: 'border',
		displayName: 'Border',
		description: 'Border',
		target: ['comp'],
	},
	boxShadow: {
		name: 'boxShadow',
		type: 'boxShadow',
		displayName: 'Box Shadow',
		description: 'Box Shadow',
		target: ['comp'],
	},
	color: {
		name: 'color',
		type: 'color',
		displayName: 'Color',
		description: 'Color',
		target: ['comp'],
	},
	shape: {
		name: 'shape',
		type: 'shape',
		displayName: 'Shape',
		description: 'Shape',
		target: ['comp'],
	},
	container: {
		name: 'container',
		type: 'container',
		displayName: 'Container',
		description: 'Container',
		target: ['comp'],
	},
	flex: {
		name: 'flex',
		type: 'flex',
		displayName: 'Flex',
		description: 'Flex',
		target: ['comp'],
	},
	font: {
		name: 'font',
		type: 'font',
		displayName: 'Font',
		description: 'Font',
		target: ['comp'],
	},
	margin: {
		name: 'margin',
		type: 'margin',
		displayName: 'Margin',
		description: 'Margin',
		target: ['comp'],
	},
	opacity: {
		name: 'opacity',
		type: 'opacity',
		displayName: 'Opacity',
		description: 'Opacity',
		target: ['comp'],
	},
	list: {
		name: 'list',
		type: 'list',
		displayName: 'List',
		description: 'List',
		target: ['comp'],
	},
	outline: {
		name: 'outline',
		type: 'outline',
		displayName: 'Outline',
		description: 'Outline',
		target: ['comp'],
	},
	padding: {
		name: 'padding',
		type: 'padding',
		displayName: 'Padding',
		description: 'Padding',
		target: ['comp'],
	},
	position: {
		name: 'position',
		type: 'position',
		displayName: 'Position',
		description: 'Position',
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
	},
	transform: {
		name: 'transform',
		type: 'transform',
		displayName: 'Transform',
		description: 'Transform',
		target: ['comp'],
	},
	zIndex: {
		name: 'zIndex',
		type: 'zIndex',
		displayName: 'Z Index',
		description: 'Z Index',
		target: ['comp'],
	},
};

export {
	COMMON_COMPONENT_PROPERTIES,
	COMPONENT_STYLE_GROUP_PROPERTIES,
	CSS_STYLE_PROPERTY_GROUP_REF,
};
