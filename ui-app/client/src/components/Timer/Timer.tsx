import React, { useCallback, useEffect } from 'react';
import { PageStoreExtractor } from '../../context/StoreContext';
import { ComponentProps } from '../../types/common';
import { runEvent } from '../util/runEvent';
import useDefinition from '../util/useDefinition';
import TimerStyle from './TimerStyle';
import { propertiesDefinition, stylePropertiesDefinition } from './timerProperties';
import { styleDefaults } from './timerStyleProperties';
import { IconHelper } from '../util/IconHelper';
import { HelperComponent } from '../HelperComponents/HelperComponent';

function Timer(props: ComponentProps) {
	const { definition, pageDefinition, locationHistory, context } = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const {
		properties: { timerType, duration, initialDelay, repeatCount, onTimerEventFunction } = {},
	} = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);

	const runUserDefinedFunction = useCallback(() => {
		if (!onTimerEventFunction) return;
		const event = pageDefinition.eventFunctions?.[onTimerEventFunction];
		if (!event) return;
		runEvent(event, onTimerEventFunction, context.pageName, locationHistory, pageDefinition);
	}, [pageDefinition, context.pageName, locationHistory, onTimerEventFunction]);

	useEffect(() => {
		const initialDelayMs = initialDelay || 0;
		const durationMs = duration || 1000;

		let timeoutId: number | undefined;
		let intervalId: number | undefined;

		const executeFunction = () => {
			runUserDefinedFunction();
		};

		if (timerType === 'Repeating') {
			let executionCount = 0;

			const startRepeatingTimer = () => {
				intervalId = setInterval(() => {
					if (!window.designMode) {
						clearInterval(intervalId);
					} else {
						executeFunction();
						executionCount++;
						if (repeatCount !== -1 && executionCount >= repeatCount) {
							clearInterval(intervalId);
						}
					}
				}, durationMs);
			};

			if (initialDelayMs > 0) {
				timeoutId = setTimeout(() => {
					executeFunction();
					executionCount++;
					startRepeatingTimer();
				}, initialDelayMs);
			} else {
				startRepeatingTimer();
			}
		} else {
			timeoutId = setTimeout(executeFunction, durationMs);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
		};
	}, [timerType, duration, initialDelay, repeatCount, runUserDefinedFunction]);

	return window.designMode ? (
		<div className="comp compTimer">
			<HelperComponent context={context} definition={definition} />
		</div>
	) : (
		<></>
	);
}

const component = {
	name: 'Timer',
	displayName: 'Timer',
	description: 'Timer component with user-defined function execution',
	component: Timer,
	styleComponent: TimerStyle,
	styleDefaults: styleDefaults,
	propertyValidation: () => [],
	properties: propertiesDefinition,
	styleProperties: stylePropertiesDefinition,
	defaultTemplate: {
		key: '',
		type: 'Timer',
		name: 'Timer',
		properties: {
			timerType: { value: 'Non-Repeating' },
			duration: { value: 1000 },
			initialDelay: { value: 0 },
			repeatCount: { value: -1 },
		},
	},
	subComponentDefinition: [
		{
			name: '',
			displayName: 'Component',
			description: 'Component',

			icon: (
				<IconHelper viewBox="0 0 18 18">
					<g transform="translate(-1092.044 -629)">
						<path
							d="M6.376,12.752a6.376,6.376,0,1,1,6.376-6.376A6.383,6.383,0,0,1,6.376,12.752Zm0-10.93A4.554,4.554,0,1,0,10.93,6.376,4.559,4.559,0,0,0,6.376,1.821Z"
							transform="translate(1094.529 634.13)"
							fill="#96a1b4"
						/>
						<rect
							width="6.827"
							height="2.56"
							rx="1.28"
							transform="translate(1097.491 630.265)"
							fill="#96a1b4"
						/>
						<rect
							width="3.414"
							height="0.853"
							rx="0.427"
							transform="matrix(0.799, 0.602, -0.602, 0.799, 1104.832, 633.364)"
							fill="#96a1b4"
						/>
						<rect
							width="2"
							height="3"
							transform="translate(1099.881 632.573)"
							fill="#96a1b4"
						/>
						<rect
							width="1.495"
							height="1.122"
							transform="matrix(0.799, 0.602, -0.602, 0.799, 1105.184, 634.491)"
							fill="#96a1b4"
						/>
						<path
							d="M1.508,0S3.6,3,3.637,3.012A2.87,2.87,0,0,1,.22,3.174C.206,3.185,1.508,0,1.508,0Z"
							transform="matrix(-0.438, -0.899, 0.899, -0.438, 1101.588, 642.367)"
							fill="#96a1b4"
						/>
					</g>
				</IconHelper>
			),
			mainComponent: true,
		},
	],
};

export default component;