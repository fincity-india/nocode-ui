import { deepEqual, duplicate, isNullValue } from '@fincity/kirun-js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MESSAGE_TYPE, addMessage } from '../../../../App/Messages/Messages';
import { SCHEMA_BOOL_COMP_PROP, SCHEMA_STRING_COMP_PROP } from '../../../../constants';
import {
	PageStoreExtractor,
	addListenerWithChildrenActivity,
	getDataFromPath,
	setData,
} from '../../../../context/StoreContext';
import {
	ComponentProperty,
	ComponentPropertyDefinition,
	ComponentPropertyEditor,
	LocationHistory,
	PageDefinition,
} from '../../../../types/common';
import Portal from '../../../Portal';
import { IconHelper } from '../../../util/IconHelper';
import { PageOperations } from '../../functions/PageOperations';
import PropertyValueEditor from '../propertyValueEditors/PropertyValueEditor';
import { Dropdown } from '../stylePropertyValueEditors/simpleEditors/Dropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHref } from '../../../util/getHref';
import getSrcUrl from '../../../util/getSrcUrl';

interface TopBarProps {
	theme: string;
	personalizationPath: string | undefined;
	logo: string | undefined;
	pagesData: any;
	currentPageId: string;
	onSave: () => void;
	onPublish?: () => void;
	onVersions?: () => void;
	onChangePersonalization: (prop: string, value: any) => void;
	url: string;
	onUrlChange: (url: string) => void;
	onDeletePersonalization: () => void;
	pageExtractor: PageStoreExtractor;
	onPageReload: () => void;
	onPageBack: () => void;
	onPageForward: () => void;
	defPath: string | undefined;
	locationHistory: Array<LocationHistory>;
	firstTimeRef: React.MutableRefObject<PageDefinition[]>;
	undoStackRef: React.MutableRefObject<PageDefinition[]>;
	redoStackRef: React.MutableRefObject<PageDefinition[]>;
	latestVersion: React.MutableRefObject<number>;
	previewMode: boolean;
	editPageName: string | undefined;
	slaveStore: any;
	storePaths: Set<string>;
	selectedSubComponent: string;
	selectedComponent?: string;
	onSelectedSubComponentChanged: (key: string) => void;
	onSelectedComponentChanged: (key: string) => void;
	pageOperations: PageOperations;
	dashboardPageName: string | undefined;
	settingsPageName: string | undefined;
	addnewPageName: string | undefined;
	editorType: string | undefined;
}

function removeExcessPages(pid: string) {
	let i = 0,
		key = null;
	const delKeys = new Array<string>();
	const allKeys = new Array<string>();

	while ((key = window.localStorage.key(i++))) {
		if (!key.startsWith('pgdef_')) continue;
		if (key.indexOf(pid) != -1) delKeys.push(key);
		else allKeys.push(key);
	}

	delKeys.forEach(k => window.localStorage.removeItem(k));
	const remKeys = allKeys.sort((a, b) => {
		let anum = parseInt(a.split('_')[2]);
		let bnum = parseInt(b.split('_')[2]);
		return bnum - anum;
	});
	if (remKeys.length > 10) remKeys.slice(10).forEach(k => window.localStorage.removeItem(k));
}

export default function DnDTopBar({
	theme,
	personalizationPath,
	onChangePersonalization,
	onSave,
	onPublish,
	url,
	onUrlChange,
	onDeletePersonalization,
	pageExtractor,
	onPageReload,
	onPageBack,
	onPageForward,
	defPath,
	firstTimeRef,
	undoStackRef,
	redoStackRef,
	latestVersion,
	previewMode,
	editPageName,
	slaveStore,
	storePaths,
	locationHistory,
	selectedComponent,
	selectedSubComponent,
	onSelectedComponentChanged,
	onSelectedSubComponentChanged,
	pageOperations,
	onVersions,
	pagesData,
	currentPageId,
	logo,
	dashboardPageName,
	settingsPageName,
	addnewPageName,
	editorType,
}: TopBarProps) {
	const [localUrl, setLocalUrl] = useState(url);
	const [deviceType, setDeviceType] = useState<string | undefined>();
	const [properties, setProperties] = useState<any>({});
	const [showProperties, setShowProperties] = useState(false);
	const [page, setPage] = useState<PageDefinition>();
	const [changed, setChanged] = useState(Date.now());
	const [permission, setPermission] = useState<string>('');
	const [selectedPage, setSelectedPage] = React.useState('');
	const location = useLocation();
	const svgLogo = logo ? <img className="_logo" src={getSrcUrl(logo)} /> : undefined;
	useEffect(() => setLocalUrl(url), [url]);
	useEffect(
		() =>
			personalizationPath
				? addListenerWithChildrenActivity(
						(_, v) => {
							setDeviceType(v?.deviceType);
						},
						pageExtractor,
						personalizationPath,
				  )
				: undefined,
		[personalizationPath],
	);

	useEffect(() => {
		if (!defPath) return;

		return addListenerWithChildrenActivity(
			(_, v) => {
				setPage(v as PageDefinition);
				setProperties(v?.properties ?? {});
				setPermission(v?.permission ?? '');
				if (!v || v?.isFromUndoRedoStack) return;
				if (
					deepEqual(
						v,
						undoStackRef.current.length
							? undoStackRef.current[undoStackRef.current.length - 1]
							: firstTimeRef.current[0],
					)
				)
					return;

				if (!firstTimeRef.current.length) {
					firstTimeRef.current.push(duplicate(v));
					return;
				}

				if (latestVersion.current < v.version) latestVersion.current = v.version;

				removeExcessPages(v.id);
				window.localStorage.setItem(`pgdef_${v.id}_${Date.now()}`, JSON.stringify(v));

				undoStackRef.current.push(duplicate(v));
				redoStackRef.current.length = 0;
				setChanged(Date.now());
			},
			pageExtractor,
			defPath,
		);
	}, [defPath, pageExtractor]);

	const changeUrl = useCallback(() => {
		if (url === localUrl) return;

		if (localUrl.indexOf(':') !== -1) {
			setLocalUrl(url);
			return;
		}

		onUrlChange(localUrl);
	}, [localUrl]);

	const inputRef = useRef<HTMLInputElement>(null);

	const changeDeviceType = useCallback(
		(device: string) =>
			onChangePersonalization('deviceType', device === deviceType ? undefined : device),
		[onChangePersonalization, deviceType],
	);
	const updatePageProperties = useCallback(
		(
			propType: 'title' | 'simple' | 'compprop' | 'seo' | 'permission',
			propName: string,
			value: any,
		) => {
			if (!defPath) return;

			const page = duplicate(
				getDataFromPath(defPath, locationHistory, pageExtractor) ?? {},
			) as PageDefinition;
			if (!page.properties) page.properties = {};
			if (propType === 'permission') {
				if (isNullValue(value.value)) delete page.permission;
				else page.permission = value?.value;
			} else if (propType === 'title') {
				if (!page.properties.title) page.properties.title = {};
				if (propName === 'name')
					if (isNullValue(value.value) && isNullValue(value.location?.expression))
						delete page.properties.title.name;
					else page.properties.title.name = value as ComponentProperty<string>;
				else if (propName === 'append')
					if (isNullValue(value.value) && isNullValue(value.location?.expression))
						delete page.properties.title.append;
					else page.properties.title.append = value as ComponentProperty<string>;
			} else if (propType === 'seo') {
				if (!page.properties.seo) page.properties.seo = {};
				if (isNullValue(value.value) && isNullValue(value.location?.expression))
					delete page.properties.seo[propName];
				else page.properties.seo[propName] = value as ComponentProperty<string>;
			} else {
				if (isNullValue(value.value)) delete page.properties[propName];
				else page.properties[propName] = value.value;
			}
			setData(defPath, page, pageExtractor.getPageName());
		},
		[],
	);

	const [showLogoDropdown, setShowLogoDropdown] = React.useState(false);

	React.useEffect(() => {
		if (!selectedPage) return;
		const furl = getHref(`/${pageExtractor.getPageName()}/${selectedPage}`, location);
		window.open(furl, '_self');
	}, [selectedPage]);

	if (previewMode) return <div className="_topBarGrid _previewMode"> </div>;

	const eventEnums = Object.entries(page?.eventFunctions ?? {}).map(([k, v]) => ({
		name: k,
		displayName: v.name,
		description: v.description ?? v.name,
	}));

	let popup = <></>;
	if (showProperties) {
		const seoNames = [
			{
				name: 'description',
				displayName: 'Description',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: ComponentPropertyEditor.LARGE_TEXT,
			},
			{
				name: 'keywords',
				displayName: 'Keywords',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
			{
				name: 'robots',
				displayName: 'Robots',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
			{
				name: 'charset',
				displayName: 'Charset',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
			{
				name: 'author',
				displayName: 'Author',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
			{
				name: 'applicationName',
				displayName: 'Application Name',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
			{
				name: 'generator',
				displayName: 'Generator',
				schema: SCHEMA_STRING_COMP_PROP,
				editor: undefined,
			},
		].map((propDef: ComponentPropertyDefinition) => (
			<div className="_eachProp" key={propDef.name}>
				<div className="_propLabel">{propDef.displayName}</div>
				<PropertyValueEditor
					propDef={propDef}
					value={properties?.seo?.[propDef.name]}
					onChange={v => updatePageProperties('seo', propDef.name, v)}
					storePaths={storePaths}
					slaveStore={slaveStore}
					editPageName={editPageName}
					pageOperations={pageOperations}
				/>
			</div>
		));
		popup = (
			<div className={`_popupBackground`} onClick={() => setShowProperties(false)}>
				<div className="_popupContainer _pageProperties" onClick={e => e.stopPropagation()}>
					<div className="_popupHeader">Page Properties</div>
					<div className="_popupContent _propertyContent">
						<div className="_pagePropertiesGrid _pageSimplePropGrid">
							<div className="_eachProp">
								<div className="_propLabel">Page Title</div>
								<PropertyValueEditor
									propDef={{
										name: 'title',
										displayName: 'Page Title',
										schema: SCHEMA_STRING_COMP_PROP,
									}}
									value={properties?.title?.name}
									onChange={v => updatePageProperties('title', 'name', v)}
									storePaths={storePaths}
									slaveStore={slaveStore}
									editPageName={editPageName}
									pageOperations={pageOperations}
								/>
							</div>
							<div className="_eachProp">
								<div className="_propLabel">Append/Prepend Title</div>
								<PropertyValueEditor
									propDef={{
										name: 'append',
										displayName: 'Append Title',
										defaultValue: 'true',
										schema: SCHEMA_STRING_COMP_PROP,
										enumValues: [
											{
												name: 'true',
												displayName: 'Append',
												description:
													'Appends the title after the application title',
											},
											{
												name: 'prepend',
												displayName: 'Prepend',
												description:
													'Prepends the title before the application title',
											},
											{
												name: 'false',
												displayName: 'Full',
												description: 'Shows the title only',
											},
										],
									}}
									value={properties?.title?.append}
									onChange={v => updatePageProperties('title', 'append', v)}
									storePaths={storePaths}
									slaveStore={slaveStore}
									editPageName={editPageName}
									pageOperations={pageOperations}
								/>
							</div>
							<div className="_eachProp">
								<div className="_propLabel">Wrap Shell</div>
								<PropertyValueEditor
									propDef={{
										name: 'wrapShell',
										displayName: 'Wrap Shell',
										schema: SCHEMA_BOOL_COMP_PROP,
									}}
									value={{ value: properties?.wrapShell }}
									onlyValue={true}
									onChange={v => updatePageProperties('simple', 'wrapShell', v)}
									storePaths={storePaths}
									slaveStore={slaveStore}
									editPageName={editPageName}
									pageOperations={pageOperations}
								/>
							</div>
							{eventEnums.length ? (
								<div className="_eachProp">
									<div className="_propLabel">On Load Function</div>
									<PropertyValueEditor
										propDef={{
											name: 'onLoadEvent',
											displayName: 'On Load Event Function',
											schema: SCHEMA_STRING_COMP_PROP,
											enumValues: eventEnums,
										}}
										value={{ value: properties?.onLoadEvent }}
										onlyValue={true}
										onChange={v =>
											updatePageProperties('simple', 'onLoadEvent', v)
										}
										storePaths={storePaths}
										slaveStore={slaveStore}
										editPageName={editPageName}
										pageOperations={pageOperations}
									/>
								</div>
							) : (
								<></>
							)}
							<div className="_eachProp">
								<div className="_propLabel">Load Strategy</div>
								<PropertyValueEditor
									propDef={{
										name: 'loadStrategy',
										displayName: 'Load Strategy',
										schema: SCHEMA_STRING_COMP_PROP,
										defaultValue: 'default',
										enumValues: [
											{
												name: 'default',
												displayName: 'No Force Call',
												description:
													"Don't call on load function on page loading.",
											},
											{
												name: 'reload',
												displayName: 'Force Call',
												description:
													'Force call on load function on page loading',
											},
										],
									}}
									value={{ value: properties?.loadStrategy }}
									onlyValue={true}
									onChange={v =>
										updatePageProperties('simple', 'loadStrategy', v)
									}
									storePaths={storePaths}
									slaveStore={slaveStore}
									editPageName={editPageName}
									pageOperations={pageOperations}
								/>
							</div>
							<div className="_eachProp">
								<div className="_propLabel">Permission Expression</div>
								<PropertyValueEditor
									propDef={{
										name: 'permission',
										displayName: 'Permission Expression',
										schema: SCHEMA_STRING_COMP_PROP,
									}}
									value={{ value: permission }}
									onlyValue={true}
									onChange={v =>
										updatePageProperties('permission', 'permission', v)
									}
									storePaths={storePaths}
									slaveStore={slaveStore}
									editPageName={editPageName}
									pageOperations={pageOperations}
								/>
							</div>
						</div>
						<div className="_pagePropertiesGrid">{seoNames}</div>
					</div>
					<div className="_right">
						<button onClick={() => setShowProperties(false)}>Close</button>
					</div>
				</div>
			</div>
		);
	}

	let dropdownItems = <></>;

	if (showLogoDropdown && (dashboardPageName || settingsPageName)) {
		dropdownItems = (
			<div className="_simpleEditorDropdownBody">
				{dashboardPageName ? (
					<div
						onClick={() => window.open(getHref(dashboardPageName, location), '_self')}
						className="_simpleEditorDropdownOption"
					>
						View dashboard
					</div>
				) : null}
				{settingsPageName ? (
					<div
						onClick={() => window.open(getHref(settingsPageName, location), '_self')}
						className="_simpleEditorDropdownOption"
					>
						Site settings
					</div>
				) : null}
			</div>
		);
	}

	let pageSelector = <></>;

	if (pagesData?.length) {
		let addNewPageButton = <></>;
		if (addnewPageName) {
			addNewPageButton = (
				<div className="_add_page_btn_container">
					<button
						type="button"
						onMouseDown={e => {
							e.stopPropagation();
							window.open(getHref(addnewPageName, location), '_self');
						}}
						className="_add_page_btn"
					>
						+ Add new page
					</button>
				</div>
			);
		}
		pageSelector = (
			<div className="_page_Selector">
				<Dropdown
					showNoneLabel={isNullValue(pagesData)}
					selectNoneLabel="--NONE--"
					value={selectedPage || currentPageId}
					onChange={v => {
						setSelectedPage(typeof v === 'string' ? v : '');
					}}
					options={pagesData ?? []}
					placeholder="Pages"
				>
					{addNewPageButton}
				</Dropdown>
			</div>
		);
	}

	let urlBar = <></>;
	let pageProperties = <></>;
	if (editorType !== 'SECTION') {
		urlBar = (
			<div className="_inputBar">
				<div className="_urlInput _peInput">
					<input
						ref={inputRef}
						type="text"
						value={localUrl}
						name="localUrl"
						onChange={e => setLocalUrl(e.target.value)}
						onBlur={changeUrl}
						onKeyUp={e => {
							if (e.key === 'Enter') changeUrl();
							else if (e.key === 'Escape') {
								setLocalUrl(url);
								setTimeout(() => inputRef.current?.blur(), 100);
							}
						}}
					/>
					<div className="_urlInputIcon" onClick={onPageBack}>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 -1.90735e-06 9 -1.90735e-06C4.02975 -1.90735e-06 -1.90735e-06 4.02975 -1.90735e-06 9C-1.90735e-06 13.9703 4.02943 18 9 18ZM9.96252 13.4171L6.14073 9.59528C5.9824 9.43708 5.89363 9.22249 5.89363 8.99875C5.89363 8.775 5.9824 8.56028 6.14073 8.40211L9.95963 4.58322C10.1728 4.37002 10.4836 4.2869 10.7747 4.36487C11.0659 4.44297 11.2934 4.67048 11.3714 4.96163C11.4493 5.25293 11.366 5.56357 11.1528 5.77675L7.93077 9.00035L11.1557 12.2243C11.3659 12.438 11.447 12.7472 11.3686 13.0366C11.2901 13.326 11.0641 13.552 10.7747 13.6304C10.4853 13.7088 10.1762 13.6278 9.96236 13.4175L9.96252 13.4171Z"
								fill="black"
								fillOpacity="0.3"
							/>
						</svg>
					</div>
					<div className="_urlInputIcon" onClick={onPageForward}>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9706 0 9 0ZM8.03748 4.58293L11.8593 8.40472C12.0176 8.56292 12.1064 8.77751 12.1064 9.00125C12.1064 9.225 12.0176 9.43972 11.8593 9.59789L8.04037 13.4168C7.82718 13.63 7.51642 13.7131 7.22527 13.6351C6.9341 13.557 6.70658 13.3295 6.62863 13.0384C6.55066 12.7471 6.63403 12.4364 6.84723 12.2233L10.0692 8.99965L6.84433 5.77572C6.63415 5.56202 6.55304 5.25275 6.63139 4.96337C6.70986 4.67396 6.93587 4.44796 7.22529 4.3696C7.51471 4.29123 7.82382 4.37223 8.03764 4.58254L8.03748 4.58293Z"
								fill="black"
								fillOpacity="0.3"
							/>
						</svg>
					</div>
				</div>
			</div>
		);
		pageProperties = (
			<div className="_iconMenuOption" tabIndex={0} onClick={() => setShowProperties(true)}>
				<IconHelper viewBox="0 0 17 19">
					<path
						d="M0 2.57143C0 1.15313 1.15313 0 2.57143 0H9V5.14286C9 5.85402 9.57455 6.42857 10.2857 6.42857H15.4286V14.5714C15.4286 15.9897 14.2754 17.1429 12.8571 17.1429H2.57143C1.15313 17.1429 0 15.9897 0 14.5714V2.57143ZM15.4286 5.14286H10.2857V0L15.4286 5.14286Z"
						fill="currentColor"
					/>
					<path
						d="M15.8709 15.3939L15.8706 15.3948C15.7822 15.6202 15.6762 15.8347 15.5554 16.0401L15.5503 16.0487L15.5503 16.0486L15.4668 16.1843L15.4628 16.1907L15.4628 16.1906C15.3313 16.3972 15.1844 16.5918 15.0244 16.7742C14.7733 17.0617 14.387 17.1325 14.0698 17.0374C14.0697 17.0374 14.0697 17.0374 14.0696 17.0374L13.3074 16.809C13.1682 16.8969 13.0229 16.9765 12.8722 17.0471L12.7074 17.7566L12.7073 17.757C12.6264 18.1043 12.3426 18.3786 11.9739 18.4356C11.9736 18.4356 11.9734 18.4357 11.9731 18.4357L11.8971 17.9415C11.652 17.98 11.3998 18.0001 11.1422 18.0001C10.8847 18.0001 10.6325 17.98 10.3874 17.9415L15.8709 15.3939ZM15.8709 15.3939C16.0128 15.0303 15.8838 14.6478 15.616 14.42C15.6156 14.4196 15.6151 14.4192 15.6146 14.4188L15.0458 13.9308C15.0502 13.8596 15.0525 13.7877 15.0525 13.7153C15.0525 13.6428 15.0502 13.5709 15.0458 13.4997L15.6146 13.0117C15.6151 13.0113 15.6155 13.0109 15.616 13.0105C15.791 12.8617 15.9068 12.6467 15.9263 12.4141L15.9957 12.3487L15.8723 12.0341C15.7839 11.8087 15.678 11.5941 15.5572 11.3888L15.5573 11.3887L15.552 11.3802L15.4686 11.2446L15.4686 11.2446L15.4646 11.2382C15.3331 11.0316 15.1861 10.8371 15.0262 10.6546L15.0253 10.6536C14.777 10.3719 14.393 10.2951 14.0716 10.3914C14.0715 10.3914 14.0714 10.3915 14.0714 10.3915L13.3092 10.6198C13.17 10.532 13.0246 10.4524 12.874 10.3818L12.7092 9.67227L12.7091 9.67184C12.6282 9.32484 12.3448 9.05067 11.9765 8.99338C11.7058 8.95084 11.4276 8.92871 11.144 8.92871C10.8612 8.92871 10.5827 8.95071 10.3105 8.99521C9.94269 9.05287 9.65976 9.32685 9.57894 9.67352L9.57884 9.67394M15.8709 15.3939L9.57884 9.67394M9.57884 9.67394L9.41408 10.3834C9.26341 10.454 9.11804 10.5337 8.97888 10.6215L8.21666 10.3932C8.2166 10.3931 8.21654 10.3931 8.21649 10.3931L9.57884 9.67394ZM9.57716 17.757C9.65806 18.104 9.94145 18.3782 10.3098 18.4355L7.26188 10.6563C7.1019 10.8388 6.95499 11.0333 6.82349 11.2399L6.82344 11.2399L6.81949 11.2463L6.73601 11.3819L6.73593 11.3818L6.73085 11.3905C6.61007 11.5958 6.50412 11.8103 6.4157 12.0358L6.41538 12.0366C6.27348 12.4003 6.40248 12.7828 6.67027 13.0105L7.24048 13.4997C7.23606 13.5709 7.23375 13.6428 7.23375 13.7153C7.23375 13.7883 7.23609 13.8607 7.24057 13.9324L6.67026 14.4217C6.40248 14.6494 6.27348 15.0319 6.41538 15.3956L6.41571 15.3964C6.50412 15.6219 6.61007 15.8364 6.73085 16.0417L6.73077 16.0418L6.73601 16.0503L6.81949 16.1859L6.81945 16.186L6.82349 16.1923C6.95499 16.3989 7.1019 16.5934 7.26188 16.7759L7.26276 16.7769C7.51111 17.0586 7.89517 17.1355 8.21666 17.039L8.21747 17.0388L8.97765 16.8094C9.11664 16.8971 9.26183 16.9766 9.41231 17.0471L9.57706 17.7566L9.57716 17.757ZM11.8058 14.2986C11.6351 14.4596 11.3975 14.5548 11.144 14.5548C10.8906 14.5548 10.653 14.4596 10.4822 14.2986C10.3125 14.1386 10.2231 13.9281 10.2231 13.7153C10.2231 13.5024 10.3125 13.2919 10.4822 13.1319C10.653 12.9709 10.8906 12.8757 11.144 12.8757C11.3975 12.8757 11.6351 12.9709 11.8058 13.1319C11.9756 13.2919 12.065 13.5024 12.065 13.7153C12.065 13.9281 11.9756 14.1386 11.8058 14.2986Z"
						fill="currentColor"
						stroke="white"
					/>
				</IconHelper>
				Page Properties
			</div>
		);
	}

	return (
		<div className="_topBarGrid">
			<div className="_topLeftBarGrid">
				<div
					className="_main_editor_dropdown"
					onMouseLeave={() => setShowLogoDropdown(false)}
					onClick={() => setShowLogoDropdown(true)}
				>
					{svgLogo}
					{dropdownItems}
				</div>
				{urlBar}
				{pageSelector}
				<div className="_topLeftCenterBarGrid"></div>
			</div>
			<div className="_topRightBarGrid">
				<div className="_buttonBar">
					<i
						className="fa fa-solid fa-rotate-left"
						title="Reload Page"
						tabIndex={0}
						role="button"
						onClick={onPageReload}
					></i>
				</div>

				<div className="_buttonBar">
					<i
						className={`fa fa-solid fa-arrow-turn-up _rotate-270 ${
							undoStackRef.current.length ? '_hasData' : '_hasNoData'
						}`}
						onClick={() => {
							if (!undoStackRef.current.length || !defPath) return;
							const x = undoStackRef.current[undoStackRef.current.length - 1];
							undoStackRef.current.splice(undoStackRef.current.length - 1, 1);
							redoStackRef.current.splice(0, 0, x);
							const pg = duplicate(
								undoStackRef.current.length
									? undoStackRef.current[undoStackRef.current.length - 1]
									: firstTimeRef.current[0],
							) as PageDefinition;
							pg.version = latestVersion.current;
							pg.isFromUndoRedoStack = true;

							if (selectedComponent && !pg.componentDefinition[selectedComponent]) {
								onSelectedComponentChanged('');
								onSelectedSubComponentChanged('');
							}

							setData(defPath, pg, pageExtractor.getPageName());
							setChanged(Date.now());
						}}
						title="Undo"
					/>
					<i
						className={`fa fa-solid fa-arrow-turn-down _rotate-270 ${
							redoStackRef.current.length ? '_hasData' : '_hasNoData'
						}`}
						onClick={() => {
							if (!redoStackRef.current.length || !defPath) return;
							const x = redoStackRef.current[0];
							undoStackRef.current.push(x);
							redoStackRef.current.splice(0, 1);
							const pg = duplicate(
								undoStackRef.current.length
									? undoStackRef.current[undoStackRef.current.length - 1]
									: firstTimeRef.current[0],
							) as PageDefinition;
							pg.version = latestVersion.current;
							pg.isFromUndoRedoStack = true;
							if (selectedComponent && !pg.componentDefinition[selectedComponent]) {
								onSelectedComponentChanged('');
								onSelectedSubComponentChanged('');
							}
							setData(defPath, pg, pageExtractor.getPageName());
							setChanged(Date.now());
						}}
						title="Redo"
					/>
				</div>

				<div className="_buttonBar">
					<i
						onClick={() =>
							onChangePersonalization(
								'theme',
								theme === '_light' ? '_dark' : '_light',
							)
						}
						className={`fa fa-solid fa-circle-half-stroke ${
							theme === '_light' ? '_rotate-180' : ''
						}`}
					/>
				</div>
				<div className="_iconMenu _personalize" tabIndex={0}>
					<IconHelper viewBox="0 0 20 20">
						<path
							d="M9.91132 0.000432403C9.24478 0.00627022 8.79063 0.0663667 8.38299 0.279796C7.97537 0.493225 7.74392 0.89826 7.64809 1.12696C7.55245 1.35567 7.52017 1.45028 7.41818 1.57167C7.31619 1.69289 7.11736 1.86614 6.6323 2.07185C6.14725 2.27755 5.88128 2.30073 5.72313 2.28957C5.56499 2.27858 5.48103 2.23239 5.24972 2.14241C5.01861 2.05244 4.56393 1.94221 4.12714 2.08678C3.69033 2.23136 3.33665 2.51896 2.86927 2.99408C2.40189 3.4692 2.11534 3.83338 1.97816 4.27242C1.84097 4.71145 1.96356 5.16218 2.05783 5.39141C2.15175 5.62081 2.19278 5.70683 2.20669 5.86464C2.22128 6.02243 2.20583 6.28205 2.00838 6.77036C1.81092 7.25867 1.6411 7.46403 1.52144 7.56794C1.40193 7.67182 1.30973 7.70411 1.08257 7.80369C0.855575 7.90328 0.448991 8.14075 0.242443 8.55183C0.0360589 8.96289 -0.00532109 9.41926 0.000516209 10.0855C0.00635395 10.7517 0.0575224 11.2117 0.271116 11.6192C0.484885 12.0266 0.897482 12.2594 1.12618 12.3553C1.35506 12.4511 1.44074 12.4832 1.56196 12.585C1.68318 12.6868 1.85952 12.8767 2.06539 13.3616C2.27126 13.8465 2.29426 14.1123 2.28344 14.2705C2.27177 14.4284 2.2261 14.5127 2.13612 14.7437C2.04598 14.9746 1.93438 15.4292 2.07912 15.8658C2.22386 16.3024 2.51146 16.6651 2.98671 17.1321C3.46196 17.5991 3.82635 17.8857 4.26555 18.0229C4.70477 18.1601 5.15565 18.0372 5.38506 17.9432C5.61446 17.8493 5.70048 17.7992 5.85846 17.7855C6.01625 17.7717 6.27759 17.7879 6.76606 17.9853C7.25453 18.1828 7.45853 18.3524 7.56257 18.4719C7.66663 18.5914 7.69891 18.6821 7.79866 18.9091C7.89842 19.1361 8.13726 19.5423 8.5485 19.7487C8.95973 19.9551 9.41473 20.0052 10.0813 19.9996C10.7478 19.9937 11.2095 19.9336 11.6171 19.7202C12.0247 19.5068 12.2562 19.1031 12.352 18.8746C12.448 18.6459 12.4813 18.5513 12.5835 18.4299C12.6855 18.3087 12.8829 18.1339 13.368 17.9282C13.853 17.7225 14.1101 17.7068 14.2682 17.7178C14.4263 17.7288 14.5122 17.7661 14.7431 17.856C14.9742 17.946 15.4274 18.0654 15.8642 17.9206C16.301 17.776 16.6638 17.4824 17.131 17.0073C17.5984 16.5322 17.8849 16.1756 18.0221 15.7366C18.1593 15.2975 18.0396 14.8394 17.944 14.61C17.85 14.3806 17.8001 14.2932 17.7862 14.1354C17.7716 13.9776 17.787 13.718 17.9845 13.2297C18.182 12.7414 18.3593 12.5449 18.4788 12.4411C18.5983 12.3372 18.689 12.3049 18.9161 12.2053C19.1431 12.1057 19.5422 11.8667 19.7487 11.4558C19.9551 11.0448 20.0054 10.5808 19.9996 9.91464C19.9937 9.24844 19.935 8.7869 19.7216 8.37942C19.5081 7.97197 19.1043 7.74069 18.8756 7.64487C18.6467 7.54906 18.5506 7.52451 18.4294 7.42251C18.3081 7.32069 18.1407 7.12323 17.9349 6.63834C17.729 6.15344 17.706 5.88901 17.7168 5.73104C17.7285 5.57307 17.7666 5.48584 17.8566 5.2549C17.9467 5.02396 18.0659 4.57099 17.9211 4.13437C17.7764 3.69773 17.4903 3.33665 17.0149 2.86962C16.5397 2.40259 16.1737 2.12355 15.7345 1.98636C15.2953 1.84917 14.8369 1.9704 14.6075 2.06449C14.3781 2.15841 14.292 2.20099 14.1341 2.21473C13.9763 2.22847 13.7149 2.21233 13.2265 2.01487C12.738 1.81741 12.5415 1.64914 12.4375 1.52963C12.3335 1.41013 12.3012 1.31792 12.2014 1.09093C12.1017 0.863934 11.8628 0.457695 11.4516 0.251277C11.0403 0.0448897 10.5778 -0.0052468 9.91124 0.000419156L9.91132 0.000432403ZM9.99529 6.16661C12.1086 6.16661 13.8409 7.89259 13.8409 10.0045C13.8409 12.1164 12.1086 13.8484 9.99529 13.8484C7.88199 13.8484 6.15568 12.1165 6.15568 10.0045C6.15568 7.89255 7.88195 6.16661 9.99529 6.16661ZM9.99529 7.70472C8.71301 7.70472 7.69601 8.72429 7.69601 10.0045C7.69601 11.2846 8.71301 12.3103 9.99529 12.3103C11.2776 12.3103 12.3021 11.2847 12.3021 10.0045C12.3021 8.72446 11.2775 7.70472 9.99529 7.70472Z"
							fill="currentColor"
						/>
					</IconHelper>
					<div className="_iconMenuBody _bottom _right">
						<div
							className="_iconMenuOption"
							tabIndex={0}
							onClick={onDeletePersonalization}
						>
							<IconHelper viewBox="0 0 19 17">
								<path
									d="M11.4702 0.17264C11.3496 0.0616247 11.1918 0 11.0279 0C10.864 0 10.7061 0.0616247 10.5856 0.17264L0.180627 10.5565C0.0648499 10.6746 0 10.8334 0 10.9988C0 11.1642 0.0648499 11.323 0.180627 11.4411L3.88765 15.1482H1.73926V16.4119H13.3448V15.1482H11.1964L18.3577 7.98688C18.4735 7.86876 18.5383 7.70996 18.5383 7.54456C18.5383 7.37916 18.4735 7.22036 18.3577 7.10225L11.4702 0.17264ZM11.7651 12.8102L5.74116 6.78631L11.0068 1.52065L17.0307 7.5235L11.7651 12.8102Z"
									fill="currentColor"
								/>
							</IconHelper>
							Clear Personalization
						</div>
						{pageProperties}
						<div
							className="_iconMenuOption"
							tabIndex={0}
							onClick={() => {
								const x = [];
								for (let i = 0; i < localStorage.length; i++) {
									const key = localStorage.key(i);
									if (key?.startsWith('pgdef_')) x.push(key);
								}
								x.forEach(k => localStorage.removeItem(k));
								addMessage(
									MESSAGE_TYPE.SUCCESS,
									'All recovered pages cleared from local storage',
									false,
									'',
								);
							}}
						>
							<IconHelper viewBox="0 0 16 18">
								<path
									d="M0 2.57143C0 1.15313 1.15313 0 2.57143 0H9V5.14286C9 5.85402 9.57455 6.42857 10.2857 6.42857H15.4286V14.5714C15.4286 15.9897 14.2754 17.1429 12.8571 17.1429H2.57143C1.15313 17.1429 0 15.9897 0 14.5714V2.57143ZM15.4286 5.14286H10.2857V0L15.4286 5.14286Z"
									fill="currentColor"
								/>
								<path
									d="M14.6431 16.4196L14.9755 16.1163L14.6721 15.7839L10.6766 11.4068L10.3732 11.0744L10.0409 11.3778L7.85357 13.3744C7.5803 13.6238 7.56691 14.0418 7.81096 14.3091L11.521 18.3736C11.7651 18.641 12.1825 18.6657 12.4558 18.4162L14.6431 16.4196Z"
									fill="currentColor"
									stroke="white"
									strokeWidth="0.9"
								/>
								<path
									d="M16.7305 11.7333L16.7399 11.7256L16.7489 11.7174C17.2758 11.2364 17.3158 10.4152 16.8324 9.88559C16.352 9.35934 15.5377 9.32156 15.0105 9.79313L14.0929 10.5443L14.0836 10.5519L14.0746 10.5601C13.5956 10.9973 12.8502 10.9624 12.4139 10.4844C12.0637 10.1008 11.4681 10.0736 11.0844 10.4238L10.3515 11.0928L10.0192 11.3961L10.3226 11.7285L14.318 16.1056L14.6214 16.438L14.9538 16.1346L15.6866 15.4656C16.0703 15.1154 16.0974 14.5198 15.7472 14.1362C15.3134 13.6609 15.3436 12.9212 15.8147 12.483L16.7305 11.7333Z"
									fill="currentColor"
									stroke="white"
									strokeWidth="0.9"
								/>
							</IconHelper>
							Clear Restored Pages
						</div>
					</div>
				</div>

				<div className="_buttonBar">
					<i onClick={onSave} title="Save" className="fa fa-solid fa-floppy-disk" />
					{onPublish && (
						<i
							onClick={onPublish}
							title="Publish"
							className="fa fa-solid fa-square-arrow-up-right"
						/>
					)}
					{onVersions && (
						<i
							onClick={onVersions}
							title="Versions"
							className="fa fa-solid  fa-clock-rotate-left"
						/>
					)}
				</div>
			</div>
			{popup}
		</div>
	);
}

function ScreenSizeButtons({
	deviceType,
	changeDeviceType,
}: {
	deviceType: string | undefined;
	changeDeviceType: (device: string) => void;
}) {
	return (
		<div className="_buttonBar _screenSizes">
			<svg
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={deviceType === 'WIDE_SCREEN' ? 'active' : ''}
				onClick={() => changeDeviceType('WIDE_SCREEN')}
				style={{ width: '37px' }}
			>
				<path
					d="M19.2074 1H2.5696C1.70273 1 1 1.70273 1 2.5696V15.4992C1 16.3661 1.70273 17.0688 2.5696 17.0688H19.2074C20.0742 17.0688 20.777 16.3661 20.777 15.4992V2.5696C20.777 1.70273 20.0742 1 19.2074 1Z"
					strokeWidth="1.53"
				/>
				<path
					d="M5.5 20.3501H16.3"
					strokeWidth="1.53"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="21.054"
				height="14.604"
				viewBox="0 0 21.054 14.604"
				className={`fa fa-solid fa-laptop ${
					deviceType === 'DESKTOP_SCREEN' ? 'active' : ''
				}`}
				onClick={() => changeDeviceType('DESKTOP_SCREEN')}
				style={{ width: '37px' }}
			>
				<g id="Group_59" data-name="Group 59" transform="translate(-1341.261 -237.23)">
					<path
						id="Path_112"
						data-name="Path 112"
						d="M15.813,1H2.277A1.277,1.277,0,0,0,1,2.277V12.8a1.277,1.277,0,0,0,1.277,1.277H15.813A1.277,1.277,0,0,0,17.09,12.8V2.277A1.277,1.277,0,0,0,15.813,1Z"
						transform="translate(1342.743 236.995)"
						strokeWidth="1.53"
					/>
					<path
						id="Path_113"
						data-name="Path 113"
						d="M5.5,20.35H25.024"
						transform="translate(1336.526 230.719)"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="1.53"
					/>
				</g>
			</svg>
			<svg
				className={deviceType === 'TABLET_LANDSCAPE_SCREEN' ? 'active' : ''}
				onClick={() => changeDeviceType('TABLET_LANDSCAPE_SCREEN')}
				width="25.53"
				style={{ width: '37px' }}
				height="18.405"
				viewBox="0 0 25.53 18.405"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g
					id="Group_57"
					data-name="Group 57"
					transform="translate(24.765 0.765) rotate(90)"
				>
					<path
						id="Path_106"
						data-name="Path 106"
						d="M15.148,24H1.727A1.727,1.727,0,0,1,0,22.273V1.727A1.727,1.727,0,0,1,1.727,0H15.148a1.727,1.727,0,0,1,1.727,1.727V22.273A1.727,1.727,0,0,1,15.148,24Z"
						transform="translate(0 0)"
						strokeWidth="1.53"
						fill="none"
						style={{ fill: 'none' }}
					/>
					<path
						id="Path_107"
						data-name="Path 107"
						d="M9.523,18h-7.8A1.727,1.727,0,0,1,0,16.273V1.727A1.727,1.727,0,0,1,1.727,0h7.8A1.727,1.727,0,0,1,11.25,1.727V16.273A1.727,1.727,0,0,1,9.523,18Z"
						transform="translate(2.813 3)"
						strokeWidth="0"
					/>
					<path
						id="Path_108"
						data-name="Path 108"
						d="M1,0A1,1,0,1,1,0,1,1,1,0,0,1,1,0Z"
						transform="translate(7.907 2.282)"
						strokeWidth="0"
					/>
				</g>
			</svg>
			<svg
				className={deviceType === 'TABLET_POTRAIT_SCREEN' ? 'active' : ''}
				onClick={() => changeDeviceType('TABLET_POTRAIT_SCREEN')}
				width="19"
				height="26"
				viewBox="0 0 19 26"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.1484 1H2.72656C1.77301 1 1 1.77301 1 2.72656V23.2734C1 24.227 1.77301 25 2.72656 25H16.1484C17.102 25 17.875 24.227 17.875 23.2734V2.72656C17.875 1.77301 17.102 1 16.1484 1Z"
					strokeWidth="1.53"
					fill="none"
					style={{ fill: 'none' }}
				/>
				<path
					d="M13.3359 4H5.53906C4.58551 4 3.8125 4.77301 3.8125 5.72656V20.2734C3.8125 21.227 4.58551 22 5.53906 22H13.3359C14.2895 22 15.0625 21.227 15.0625 20.2734V5.72656C15.0625 4.77301 14.2895 4 13.3359 4Z"
					strokeWidth="0"
				/>
				<path
					d="M9.90723 22.7178C10.4595 22.7178 10.9072 22.2701 10.9072 21.7178C10.9072 21.1655 10.4595 20.7178 9.90723 20.7178C9.35494 20.7178 8.90723 21.1655 8.90723 21.7178C8.90723 22.2701 9.35494 22.7178 9.90723 22.7178Z"
					strokeWidth="0"
				/>
			</svg>
			<svg
				width="21"
				height="12"
				viewBox="0 0 21 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={deviceType === 'MOBILE_LANDSCAPE_SCREEN' ? 'active' : ''}
				onClick={() => changeDeviceType('MOBILE_LANDSCAPE_SCREEN')}
				style={{ width: '36px' }}
			>
				<path
					d="M1.28223 2.72656L1.28223 9.27344C1.28223 10.227 2.05523 11 3.00879 11L17.5557 11C18.5092 11 19.2822 10.227 19.2822 9.27344V2.72656C19.2822 1.77301 18.5092 1 17.5557 1L3.00879 1C2.05523 1 1.28223 1.77301 1.28223 2.72656Z"
					strokeWidth="1.53"
					fill="none"
					style={{ fill: 'none' }}
				/>
				<path
					d="M1 2.4375L1 10.4375C1 10.9898 1.44772 11.4375 2 11.4375L16 11.4375C16.5523 11.4375 17 10.9898 17 10.4375V2.4375C17 1.88521 16.5523 1.4375 16 1.4375L2 1.4375C1.44772 1.4375 1 1.88521 1 2.4375Z"
					strokeWidth="0"
				/>
				<path
					d="M2 4.4375L2 7.9375C2 8.21364 2.22386 8.4375 2.5 8.4375H3.5C3.77614 8.4375 4 8.21364 4 7.9375V4.4375C4 4.16136 3.77614 3.9375 3.5 3.9375H2.5C2.22386 3.9375 2 4.16136 2 4.4375Z"
					fill="white"
					style={{ fill: 'white' }}
					strokeWidth="0"
				/>
			</svg>
			<svg
				width="13"
				height="21"
				viewBox="0 0 13 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className={deviceType === 'MOBILE_POTRAIT_SCREEN' ? 'active' : ''}
				onClick={() => changeDeviceType('MOBILE_POTRAIT_SCREEN')}
				style={{ width: '28px' }}
			>
				<path
					d="M9.71094 1.28223H3.16406C2.21051 1.28223 1.4375 2.05523 1.4375 3.00879V17.5557C1.4375 18.5092 2.21051 19.2822 3.16406 19.2822H9.71094C10.6645 19.2822 11.4375 18.5092 11.4375 17.5557V3.00879C11.4375 2.05523 10.6645 1.28223 9.71094 1.28223Z"
					strokeWidth="1.53"
					fill="none"
					style={{ fill: 'none' }}
				/>
				<path
					d="M10 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H10C10.5523 17 11 16.5523 11 16V2C11 1.44772 10.5523 1 10 1Z"
					strokeWidth="0"
				/>
				<path
					d="M8 2H4.5C4.22386 2 4 2.22386 4 2.5V3.5C4 3.77614 4.22386 4 4.5 4H8C8.27614 4 8.5 3.77614 8.5 3.5V2.5C8.5 2.22386 8.27614 2 8 2Z"
					fill="white"
					style={{ fill: 'white' }}
					strokeWidth="0"
				/>
			</svg>
		</div>
	);
}
