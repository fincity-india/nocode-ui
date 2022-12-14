import React from 'react';
import { processStyleDefinition } from '../../util/styleProcessor';
import { styleProperties, styleDefaults } from './TextStyleProperties';

const PREFIX = '.comp.compText';
export default function LabelStyle({ theme }: { theme: Map<string, Map<string, string>> }) {
	const css = `` + processStyleDefinition(PREFIX, styleProperties, styleDefaults, theme);

	return <style id="TextCss">{css}</style>;
}
