import React from 'react';
import { processStyleDefinition } from '../../util/styleProcessor';
import { styleProperties, styleDefaults } from './buttonStyleProperties';

const PREFIX = '.comp.compButton';
export default function ButtonStyle({ theme }: { theme: Map<string, Map<string, string>> }) {
	const css =
		`
		${PREFIX} .fabButton {
			width: 56px;
			height: 56px;
			border-radius: 28px;
			border: 0px;
			cursor: pointer;
		}
		
		${PREFIX} .fabButtonMini {
			width: 40px;
			height: 40px;
			border-radius: 28px;
			border: 0px;
			cursor: pointer;
		}
		
		${PREFIX} .button .buttonInternalContainer {
			display: flex;
			align-items: center;
		}
		
		${PREFIX} .button .leftButtonIcon {
			margin-right: 8px;
		}
		
		${PREFIX} .button .rightButtonIcon {
			margin-left: 8px;
		}
		
		${PREFIX} .button {
			padding: 0 32px;
			height: 41px;
			border: none;
			border-radius: 5px;
			opacity: 1;
			margin: 10px;
			cursor: pointer;
		}
		
		${PREFIX} .button:hover {
			opacity: 69%;
		}
		
		${PREFIX} .button.outlined {
			background: transparent;
		}
		
		${PREFIX} .button.text {
			padding: 0 12px;
			border: 0;
			background: transparent;
		}
	` + processStyleDefinition(PREFIX, styleProperties, styleDefaults, theme);

	return <style id="ButtonCss">{css}</style>;
}
