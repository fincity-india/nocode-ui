import React from 'react';
import { Component, ComponentPropertyDefinition } from '../types/common';
import { HelperComponent } from './HelperComponent';

function Nothing({ definition }: { definition: any }) {
	return (
		<div className="comp compNothing">
			<HelperComponent definition={definition} />
			No component with type {definition.type} found.
		</div>
	);
}

const component: Component = {
	icon: 'fa-solid fa-skull-crossbones',
	name: 'Nothing',
	displayName: 'Nothing',
	description: 'Nothing component',
	component: Nothing,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: [],
	isHidden: true,
};

export default component;
