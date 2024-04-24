import React, { useEffect, useState } from 'react';
import { getData, getDataFromPath, PageStoreExtractor, setData } from '../../context/StoreContext';
import { HelperComponent } from '../HelperComponents/HelperComponent';
import { ComponentPropertyDefinition, ComponentProps } from '../../types/common';
import { updateLocationForChild } from '../util/updateLoactionForChild';
import { Component } from '../../types/common';
import { propertiesDefinition, stylePropertiesDefinition } from './tableCloumnHeaderProperties';
import TableColumnHeaderStyle from './TableColumnHeaderStyle';
import useDefinition from '../util/useDefinition';
import Children from '../Children';
import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import { deepEqual, ExpressionEvaluator } from '@fincity/kirun-js';
import { getExtractionMap } from '../util/getRenderData';
import { styleDefaults } from './tableColumnHeaderStyleProperties';
import { SubHelperComponent } from '../HelperComponents/SubHelperComponent';

function TableColumnHeaderComponent(props: ComponentProps) {
	const {
		definition: { children },
		locationHistory = [],
		context,
		definition,
	} = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const { properties: { label, leftIcon, rightIcon } = {}, stylePropertiesWithPseudoStates } =
		useDefinition(
			definition,
			propertiesDefinition,
			stylePropertiesDefinition,
			locationHistory,
			pageExtractor,
		);
	console.log(definition, 'picard', propertiesDefinition);
	const styleProperties = processComponentStylePseudoClasses(
		props.pageDefinition,
		{ hover: false },
		stylePropertiesWithPseudoStates,
	);

	return (
		<div className="comp compTableHeaderColumn" style={{ ...styleProperties.comp }}>
			<HelperComponent context={props.context} definition={definition} />

			<div className="">
				{leftIcon ? (
					<i style={styleProperties.leftIcon ?? {}} className={`_leftIcon ${leftIcon}`}>
						<SubHelperComponent
							definition={definition}
							subComponentName="leftIcon"
						></SubHelperComponent>
					</i>
				) : undefined}
				{label}
				{rightIcon ? (
					<i
						style={styleProperties.rightIcon ?? {}}
						className={`_rightIcon ${rightIcon}`}
					>
						<SubHelperComponent
							definition={definition}
							subComponentName="rightIcon"
						></SubHelperComponent>
					</i>
				) : undefined}
			</div>
		</div>
	);
}

const component: Component = {
	name: 'TableColumnHeader',
	displayName: 'Table Header',
	description: 'Table Header component',
	component: TableColumnHeaderComponent,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	styleProperties: stylePropertiesDefinition,
	properties: propertiesDefinition,
	styleComponent: TableColumnHeaderStyle,
	styleDefaults: styleDefaults,
	isHidden: true,
	subComponentDefinition: [
		{
			name: '',
			displayName: 'Component',
			description: 'Component',
			mainComponent: true,
			icon: 'fa-solid fa-diagram-next',
		},
	],
};

export default component;
