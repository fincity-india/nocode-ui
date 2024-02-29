import React, { useEffect, useRef } from 'react';
import {
	PageStoreExtractor,
	addListenerAndCallImmediately,
	getPathFromLocation,
} from '../../context/StoreContext';
import { Component, ComponentPropertyDefinition, ComponentProps } from '../../types/common';
import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import { HelperComponent } from '../HelperComponents/HelperComponent';
import { IconHelper } from '../util/IconHelper';
import useDefinition from '../util/useDefinition';
import SubPageStyle from './ChartStyle';
import { propertiesDefinition, stylePropertiesDefinition } from './chartProperties';
import { styleDefaults } from './chartStyleProperties';
import { deepEqual, isNullValue } from '@fincity/kirun-js';
import Regular from './types/Regular';
import Radial from './types/Radial';
import Waffle from './types/Waffle';
import Dot from './types/Dot';
import Radar from './types/Radar';
import { ChartData, Dimension, makeChartDataFromProperties } from './types/common';
import Legends from './types/chartComponents/Legends';

function Chart(props: Readonly<ComponentProps>) {
	const {
		definition,
		locationHistory,
		context,
		definition: { bindingPath, children },
	} = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const { stylePropertiesWithPseudoStates, properties } = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);

	const [value, setValue] = React.useState<any>(undefined);

	const bindingPathPath = bindingPath
		? getPathFromLocation(bindingPath, locationHistory, pageExtractor)
		: undefined;

	React.useEffect(() => {
		if (!bindingPathPath) return;
		return addListenerAndCallImmediately(
			(_, v) => {
				if (isNullValue(v)) {
					setValue(undefined);
					return;
				}
				setValue(v);
			},
			pageExtractor,
			bindingPathPath,
		);
	}, [bindingPathPath]);

	const resolvedStyles = processComponentStylePseudoClasses(
		props.pageDefinition,
		{},
		stylePropertiesWithPseudoStates,
	);

	const containerRef = useRef<HTMLDivElement>(null);
	const [chartDimension, setChartDimension] = React.useState<Dimension>({ width: 0, height: 0 });
	const [legendDimesion, setLegendDimension] = React.useState<Dimension>({ width: 0, height: 0 });

	const [oldProperties, setOldProperties] = React.useState<any>(undefined);
	const [chartData, setChartData] = React.useState<ChartData | undefined>(undefined);

	useEffect(() => {
		if (deepEqual(properties, oldProperties)) return;
		console.log('Setting props', properties);
		setOldProperties(properties);
		setChartData(makeChartDataFromProperties(properties, locationHistory, pageExtractor));
	}, [oldProperties, properties, locationHistory, pageExtractor]);

	useEffect(() => {
		if (isNullValue(containerRef.current)) return;

		let rect = containerRef.current!.getBoundingClientRect();
		setChartDimension({ width: rect.width, height: rect.height });
		const resizeObserver = new ResizeObserver(() => {
			setTimeout(() => {
				const newRect = containerRef.current?.getBoundingClientRect();
				if (!newRect) return;
				if (
					Math.abs(newRect.width - rect.width) < 8 &&
					Math.abs(newRect.height - rect.height) < 8
				)
					return;
				rect = newRect;
				setChartDimension({ width: newRect.width, height: newRect.height });
			}, 2000);
		});
		resizeObserver.observe(containerRef.current!);
		return () => resizeObserver.disconnect();
	}, [containerRef.current, setChartDimension]);

	let chart = <></>;

	if (properties?.type === 'waffle') {
		chart = <Waffle properties={properties} containerRef={containerRef.current} />;
	} else if (properties?.type === 'radial') {
		chart = <Radial properties={properties} containerRef={containerRef.current} />;
	} else if (properties?.type === 'dot') {
		chart = <Dot properties={properties} containerRef={containerRef.current} />;
	} else if (properties?.type === 'radar') {
		chart = <Radar properties={properties} containerRef={containerRef.current} />;
	} else {
		chart = (
			<Regular
				properties={properties}
				chartDimension={chartDimension}
				legendDimension={legendDimesion}
				locationHistory={locationHistory}
				pageExtractor={pageExtractor}
			/>
		);
	}

	return (
		<div className={`comp compChart `} style={resolvedStyles.comp ?? {}} ref={containerRef}>
			<HelperComponent context={props.context} definition={definition} />
			<svg
				viewBox={`0 0 ${chartDimension.width} ${chartDimension.height}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				<Legends
					chartData={chartData}
					properties={properties}
					chartDimension={chartDimension}
					legendDimension={legendDimesion}
					styles={resolvedStyles.legendLabel ?? {}}
					onLegendDimensionChange={d => setLegendDimension(d)}
				/>
			</svg>
		</div>
	);
}

const component: Component = {
	name: 'Chart',
	displayName: 'Chart',
	description: 'Chart component',
	component: Chart,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: propertiesDefinition,
	styleProperties: stylePropertiesDefinition,
	styleComponent: SubPageStyle,
	styleDefaults: styleDefaults,
	stylePseudoStates: [],
	allowedChildrenType: new Map([['Grid', 1]]),
	bindingPaths: {
		bindingPath: { name: 'Selection Binding' },
	},
	subComponentDefinition: [
		{
			name: '',
			displayName: 'Component',
			description: 'Component',
			mainComponent: true,
			icon: (
				<IconHelper viewBox="0 0 22 24">
					<g id="Group_109" data-name="Group 109" transform="translate(-1387 -336.204)">
						<rect
							id="Rectangle_38"
							data-name="Rectangle 38"
							width="22"
							height="22"
							rx="1"
							transform="translate(1387 338)"
							fill="currentColor"
							fillOpacity="0.2"
						/>
						<rect
							id="Rectangle_39"
							data-name="Rectangle 39"
							width="15"
							height="2"
							rx="0.4"
							transform="translate(1391.5 342.796) rotate(90)"
							fill="currentColor"
						/>
						<rect
							id="Rectangle_40"
							data-name="Rectangle 40"
							width="17"
							height="2"
							rx="0.4"
							transform="translate(1389.5 355.796)"
							fill="currentColor"
						/>
						<rect
							id="Rectangle_41"
							data-name="Rectangle 41"
							width="9.452"
							height="1.718"
							rx="0.4"
							transform="translate(1394.993 344.876) rotate(90)"
							fill="currentColor"
						/>
						<rect
							id="Rectangle_42"
							data-name="Rectangle 42"
							width="6.391"
							height="1.718"
							rx="0.4"
							transform="translate(1401.978 347.937) rotate(90)"
							fill="currentColor"
						/>
						<rect
							id="Rectangle_43"
							data-name="Rectangle 43"
							width="3.867"
							height="1.718"
							rx="0.4"
							transform="translate(1398.485 350.461) rotate(90)"
							fill="currentColor"
						/>
						<rect
							id="Rectangle_44"
							data-name="Rectangle 44"
							width="18.124"
							height="1.718"
							rx="0.4"
							transform="translate(1405.471 336.204) rotate(90)"
							fill="currentColor"
						/>
					</g>
				</IconHelper>
			),
		},
		{
			name: 'xAxisLabel',
			displayName: 'X Axis Label',
			description: 'X Axis Label',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'yAxisLabel',
			displayName: 'Y Axis Label',
			description: 'Y Axis Label',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'legendLabel',
			displayName: 'Legend Label',
			description: 'Legend Label',
			icon: 'fa fa-solid fa-box',
		},
		{
			name: 'tooltip',
			displayName: 'Tooltip',
			description: 'Tooltip',
			icon: 'fa fa-solid fa-box',
		},
	],
};

export default component;
