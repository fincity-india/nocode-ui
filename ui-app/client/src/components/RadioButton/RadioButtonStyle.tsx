import React from 'react';
import { StyleResolution } from '../../types/common';
import { processStyleDefinition } from '../../util/styleProcessor';
import { styleProperties, styleDefaults } from './RadioButtonStyleProperties';

const PREFIX = '.comp.compRadioButton';
export default function RadioButtonStyle({ theme }: { theme: Map<string, Map<string, string>> }) {
	const css =
		`
    ${PREFIX}{
        display: flex;
    }

    ${PREFIX} .radioLabel {
        display: inline-flex;
        gap: 5px;
        justify-items: center;
        text-align: center;
        align-items: center;
        position: relative;
    }

    ${PREFIX} .radioLabel.horizontal {
        flex-direction: row;
    }

    ${PREFIX} .radioLabel.vertical {
        flex-direction: column;
    }
    ` + processStyleDefinition(PREFIX, styleProperties, styleDefaults, theme);
	return <style id="RadioButtonCss">{css}</style>;
}
