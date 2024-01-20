import React, { Children, CSSProperties, useEffect, useState } from 'react';
import { getDataFromPath } from '../../context/StoreContext';
import { messageToMaster } from '../../slaveFunctions';
import { ComponentDefinition } from '../../types/common';
import { camelCaseToUpperSpaceCase } from '../../functions/utils';

interface SubHelperComponentPropsType {
	definition: ComponentDefinition;
	children?: React.ReactNode;
	subComponentName: string;
	style?: React.CSSProperties;
	className?: string;
	zIndex?: number;
}

function SubHelperComponentInternal({
	definition,
	subComponentName,
	children,
	style: upperStyle = {},
	className,
	zIndex = 6,
}: SubHelperComponentPropsType) {
	const [, setLastChanged] = useState(Date.now());
	const [hover, setHover] = useState(false);

	useEffect(() => {
		function onMessageRecieved(e: MessageEvent) {
			const { data: { type } = {} } = e;

			if (!type || !type.startsWith('EDITOR_')) return;
			setLastChanged(Date.now());
		}
		window.addEventListener('message', onMessageRecieved);
		return () => window.removeEventListener('message', onMessageRecieved);
	}, [setLastChanged]);

	const {
		editingPageDefinition: { name = '', componentDefinition = {} } = {},
		selectedComponents,
		selectedSubComponent = '',
		personalization: { slave: { highlightColor = '#3fa4d3', noSelection = false } = {} } = {},
	} = window.pageEditor ?? {};

	const currentPage = getDataFromPath(`Store.urlDetails.pageName`, []);

	if (
		noSelection ||
		!componentDefinition?.[definition.key] ||
		name !== currentPage ||
		selectedComponents?.[0] !== definition.key
	)
		return <>{children}</>;

	let style: CSSProperties = {
		...upperStyle,
		outline:
			hover || selectedSubComponent.endsWith(subComponentName)
				? `2px solid ${highlightColor}`
				: '',
		borderRadius: '3px',
		zIndex: zIndex,
		pointerEvents: 'all',
		height: '94%',
		width: '94%',
		left: '2%',
		top: '2%',
		position: 'absolute',
		cursor: 'pointer',
		border: 'none',
		background: 'none',
	};

	return (
		<div
			style={style}
			className={`${className ?? ''} disableChildrenEvents `}
			onMouseEnter={e => setHover(true)}
			onMouseLeave={e => setHover(false)}
			onClick={e => {
				e.stopPropagation();
				e.preventDefault();
				messageToMaster({
					type: 'SLAVE_SELECTED_SUB',
					payload: `${definition.key}:${subComponentName}`,
				});
			}}
			onContextMenu={e => {
				e.stopPropagation();
				e.preventDefault();
				messageToMaster({
					type: 'SLAVE_CONTEXT_MENU',
					payload: {
						componentKey: definition.key,
						menuPosition: window.determineRightClickPosition(e.nativeEvent),
					},
				});
			}}
			onDoubleClick={e => {
				e.stopPropagation();
				e.preventDefault();
				messageToMaster({
					type: 'SLAVE_SELECTED_SUB',
					payload: '',
				});
			}}
			title={camelCaseToUpperSpaceCase(subComponentName)}
		>
			{children}
		</div>
	);
}

export function SubHelperComponent(props: SubHelperComponentPropsType) {
	let { children } = props;

	return window.designMode === 'PAGE' ? <SubHelperComponentInternal {...props} /> : <></>;
}
