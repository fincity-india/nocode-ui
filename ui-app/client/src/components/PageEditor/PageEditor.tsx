import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { HelperComponent } from '../HelperComponent';
import {
	ComponentPropertyDefinition,
	ComponentProps,
	LocationHistory,
	PageDefinition,
} from '../../types/common';
import {
	addListenerAndCallImmediately,
	addListenerAndCallImmediatelyWithChildrenActivity,
	getData,
	getDataFromPath,
	getPathFromLocation,
	PageStoreExtractor,
	setData,
} from '../../context/StoreContext';
import { Component } from '../../types/common';
import { propertiesDefinition, stylePropertiesDefinition } from './pageEditorProperties';
import GridStyle from './PageEditorStyle';
import useDefinition from '../util/useDefinition';
import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import DnDEditor from './editors/DnDEditor/DnDEditor';
import TopBar from './editors/DnDEditor/DnDTopBar';
import { runEvent } from '../util/runEvent';
import { MASTER_FUNCTIONS } from './functions/masterFunctions';
import PageOperations from './functions/PageOperations';
import IssuePopup, { Issue } from './components/IssuePopup';

function savePersonalizationCurry(
	personalizationPath: string,
	pageName: string,
	onChangePersonalization: any,
	locationHistory: Array<LocationHistory>,
	pageDefinition: PageDefinition,
) {
	if (!onChangePersonalization) return (key: string, value: any) => {};
	let handle: any = -1;

	return (key: string, value: any) => {
		if (handle !== -1) clearTimeout(handle);

		setData(`${personalizationPath}.${key}`, value, pageName);
		handle = setTimeout(() => {
			(async () =>
				await runEvent(
					onChangePersonalization,
					'pageEditorSave',
					pageName,
					locationHistory,
					pageDefinition,
				))();
		}, 2000);
	};
}

function PageEditor(props: ComponentProps) {
	const {
		definition,
		definition: { bindingPath, bindingPath2 },
		pageDefinition,
		locationHistory,
		context,
	} = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const {
		key,
		stylePropertiesWithPseudoStates,
		properties: { logo, theme, onSave, onChangePersonalization, onDeletePersonalization } = {},
	} = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);

	// binding path for the page definition to load
	const defPath = bindingPath
		? getPathFromLocation(bindingPath, locationHistory, pageExtractor)
		: undefined;

	// binding path for the editor's personalization.
	const personalizationPath = bindingPath2
		? getPathFromLocation(bindingPath2, locationHistory, pageExtractor)
		: undefined;

	const resolvedStyles = processComponentStylePseudoClasses({}, stylePropertiesWithPseudoStates);

	const personalization = personalizationPath
		? getDataFromPath(personalizationPath, locationHistory, pageExtractor) ?? {}
		: {};

	// Managing theme with local state.
	const [localTheme, setLocalTheme] = useState(personalization.theme ?? theme);

	// Checking if someone changed the theme
	useEffect(() => {
		if (!personalizationPath) return;

		return addListenerAndCallImmediately(
			(_, v) => setLocalTheme(v ?? theme),
			pageExtractor,
			`${personalizationPath}.theme`,
		);
	}, [personalizationPath]);

	useEffect(() => setData('Store.pageData._global.collapseMenu', true), []);

	// Function to save the page
	const saveFunction = useCallback(() => {
		if (!onSave || !pageDefinition.eventFunctions?.[onSave]) return;

		(async () =>
			await runEvent(
				pageDefinition.eventFunctions[onSave],
				'pageEditorSave',
				context.pageName,
				locationHistory,
				pageDefinition,
			))();
	}, [onSave]);

	// Clear the personalization
	const deletePersonalization = useCallback(() => {
		if (!onDeletePersonalization || !pageDefinition.eventFunctions?.[onDeletePersonalization])
			return;

		(async () =>
			await runEvent(
				pageDefinition.eventFunctions[onDeletePersonalization],
				onDeletePersonalization,
				context.pageName,
				locationHistory,
				pageDefinition,
			))();
	}, [onDeletePersonalization]);

	// Function to save the personalization
	const savePersonalization = useMemo(() => {
		if (!personalizationPath) return (key: string, value: any) => {};

		return savePersonalizationCurry(
			personalizationPath,
			context.pageName,
			pageDefinition.eventFunctions?.[onChangePersonalization],
			locationHistory,
			pageDefinition,
		);
	}, [
		personalizationPath,
		context.pageName,
		onChangePersonalization,
		locationHistory,
		pageDefinition,
	]);

	// Managing url and client code of the URL.
	const [url, setUrl] = useState<string>('');
	const [clientCode, setClientCode] = useState<string>('');

	const editPageDefinition = !defPath
		? undefined
		: getDataFromPath(`${defPath}`, locationHistory, pageExtractor);

	useEffect(() => {
		if (!editPageDefinition || !personalization) {
			setUrl('');
			setClientCode('');
			return;
		}

		if (personalization?.pageLeftAt?.[editPageDefinition.name]) {
			setUrl(personalization.pageLeftAt[editPageDefinition.name].url);
			setClientCode(personalization.pageLeftAt[editPageDefinition.name].clientCode);
			return;
		}

		setClientCode(editPageDefinition.clientCode);
		setUrl(
			`/${editPageDefinition.appCode}/${
				clientCode === '' ? editPageDefinition.clientCode : clientCode
			}/page/${editPageDefinition.name}`,
		);
		setClientCode(editPageDefinition.clientCode);
	}, [personalization, editPageDefinition]);

	// Function to remember url for a client.
	const urlChange = useCallback(
		(v: string) => {
			setUrl(v ?? '');
			if (!personalizationPath || !editPageDefinition.name) return;
			savePersonalization(`pageLeftAt.${editPageDefinition.name}.url`, v);
			savePersonalization(
				`pageLeftAt.${editPageDefinition.name}.clientCode`,
				clientCode === '' ? editPageDefinition.clientCode : clientCode,
			);
		},
		[setUrl, savePersonalization, editPageDefinition?.name],
	);

	const ref = useRef<HTMLIFrameElement>(null);
	const [selectedComponent, setSelectedComponent] = useState<string>();
	const [issue, setIssue] = useState<Issue>();

	// Creating an object to manage the changes because of various operations like drag and drop.
	const operations = useMemo(
		() =>
			new PageOperations(
				defPath,
				locationHistory,
				pageExtractor,
				setIssue,
				selectedComponent,
				key => setSelectedComponent(key),
			),
		[
			defPath,
			locationHistory,
			pageExtractor,
			selectedComponent,
			setIssue,
			setSelectedComponent,
		],
	);

	// On changing the definition of the page, this effect sends to the iframe/slave.
	useEffect(() => {
		if (!defPath) return;
		return addListenerAndCallImmediatelyWithChildrenActivity(
			(_, payload) => {
				if (!ref.current) return;
				ref.current.contentWindow?.postMessage({
					type: 'EDITOR_DEFINITION',
					payload,
				});
			},
			pageExtractor,
			defPath,
		);
	}, [defPath, ref.current]);

	// On changing the personalization, this effect sends to the iframe/slave.
	useEffect(() => {
		if (!personalizationPath) return;
		return addListenerAndCallImmediatelyWithChildrenActivity(
			(_, payload) => {
				if (!ref.current) return;
				ref.current.contentWindow?.postMessage({
					type: 'EDITOR_PERSONALIZATION',
					payload,
				});
			},
			pageExtractor,
			personalizationPath,
		);
	}, [personalizationPath, ref.current]);

	// On changing the selection, this effect sends to the iframe/slave.
	useEffect(() => {
		if (!defPath) return;
		if (!ref.current) return;
		ref.current.contentWindow?.postMessage({
			type: 'EDITOR_SELECTION',
			payload: selectedComponent,
		});
	}, [selectedComponent, ref.current]);

	// The type of the editor should b esent to iframe/slave.
	useEffect(() => {
		if (!ref.current) return;
		ref.current.contentWindow?.postMessage({
			type: 'EDITOR_TYPE',
			payload: 'PAGE',
		});
	}, [ref.current]);

	// Effect to listen to all the messages from the iframe/slave.
	useEffect(() => {
		function onMessageFromSlave(e: MessageEvent) {
			const {
				data: { type, payload },
			} = e;

			if (!type || !type.startsWith('SLAVE_') || !ref.current) return;
			if (!MASTER_FUNCTIONS.has(type)) throw Error('Unknown message from Slave : ' + type);

			MASTER_FUNCTIONS.get(type)?.(
				{
					iframe: ref.current,
					editPageDefinition,
					defPath,
					personalization,
					personalizationPath,
					onSelectedComponentChange: key => setSelectedComponent(key),
					operations,
				},
				payload,
			);
		}

		window.addEventListener('message', onMessageFromSlave);
		return () => window.removeEventListener('message', onMessageFromSlave);
	}, [
		ref.current,
		editPageDefinition,
		defPath,
		personalization,
		personalizationPath,
		setSelectedComponent,
		operations,
	]);

	// If the personalization is not loaded, we don't load the view.
	if (personalizationPath && !personalization) return <></>;

	return (
		<>
			<div className={`comp compPageEditor ${localTheme}`} style={resolvedStyles.comp ?? {}}>
				<HelperComponent key={`${key}_hlp`} definition={definition} />
				<DnDEditor
					personalizationPath={personalizationPath}
					defPath={defPath}
					url={url}
					pageName={context.pageName}
					pageExtractor={pageExtractor}
					onSave={saveFunction}
					onChangePersonalization={savePersonalization}
					iframeRef={ref}
					locationHistory={locationHistory}
					selectedComponent={selectedComponent}
					onSelectedComponentChanged={(key: string) => setSelectedComponent(key)}
					operations={operations}
					onPageReload={() => ref.current?.contentWindow?.location.reload()}
					theme={localTheme}
					logo={logo}
					onUrlChange={urlChange}
					onDeletePersonalization={deletePersonalization}
				/>
			</div>
			<IssuePopup
				issue={issue}
				personalizationPath={personalizationPath}
				pageExtractor={pageExtractor}
				onClearIssue={() => setIssue(undefined)}
			/>
		</>
	);
}

const component: Component = {
	icon: 'fa-solid fa-newspaper',
	name: 'PageEditor',
	displayName: 'Page Editor',
	description: 'Page Editor component',
	component: PageEditor,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: propertiesDefinition,
	styleComponent: GridStyle,
	bindingPaths: {
		bindingPath: { name: 'Definition' },
		bindingPath2: { name: 'Personalization' },
	},
};

export default component;
