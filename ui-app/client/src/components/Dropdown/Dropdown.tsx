import { deepEqual, isNullValue } from '@fincity/kirun-js';
import React, { ChangeEvent, UIEvent, useCallback, useEffect, useRef, useState } from 'react';
import CommonInputText from '../../commonComponents/CommonInputText';
import {
	PageStoreExtractor,
	addListenerAndCallImmediately,
	getPathFromLocation,
	setData,
} from '../../context/StoreContext';
import { Component, ComponentPropertyDefinition, ComponentProps } from '../../types/common';
import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import { validate } from '../../util/validationProcessor';
import { SubHelperComponent } from '../SubHelperComponent';
import { getRenderData } from '../util/getRenderData';
import { getSelectedKeys } from '../util/getSelectedKeys';
import { runEvent } from '../util/runEvent';
import useDefinition from '../util/useDefinition';
import { flattenUUID } from '../util/uuid';
import DropdownStyle from './DropdownStyle';
import { propertiesDefinition, stylePropertiesDefinition } from './dropdownProperties';
import { styleDefaults } from './dropdownStyleProperties';

function DropdownComponent(props: ComponentProps) {
	const [showDropdown, setShowDropdown] = useState(false);
	const [searchDropdownData, setSearchDropdownData] = useState<
		Array<
			| {
					label: any;
					value: any;
					key: any;
					originalObjectKey: any;
			  }
			| undefined
		>
	>();
	const [selected, setSelected] = useState<any>();
	const [searchText, setSearchText] = useState('');
	const [focus, setFocus] = useState(false);
	const [validationMessages, setValidationMessages] = React.useState<Array<string>>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const pageExtractor = PageStoreExtractor.getForContext(props.context.pageName);
	const [hoverKey, setHoverKey] = useState<string | undefined>();
	const {
		definition: { bindingPath, bindingPath2 },
		locationHistory,
		context,
		definition,
		pageDefinition: { translations },
	} = props;
	const {
		key,
		properties: {
			labelKey,
			uniqueKey,
			selectionKey,
			labelKeyType,
			selectionType,
			uniqueKeyType,
			onClick,
			datatype,
			data,
			placeholder,
			readOnly,
			label,
			closeOnMouseLeave,
			isMultiSelect,
			isSearchable,
			noFloat,
			validation,
			searchLabel,
			clearSearchTextOnClose,
			onSearch,
			onScrollReachedEnd,
			designType,
			colorScheme,
			leftIcon,
		} = {},
		stylePropertiesWithPseudoStates,
	} = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);
	const clickEvent = onClick ? props.pageDefinition.eventFunctions[onClick] : undefined;
	const searchEvent = onSearch ? props.pageDefinition.eventFunctions[onSearch] : undefined;
	const bindingPathPath = getPathFromLocation(bindingPath!, locationHistory, pageExtractor);
	const searchBindingPath = getPathFromLocation(bindingPath2!, locationHistory, pageExtractor);
	useEffect(() => {
		if (!bindingPathPath) return;
		addListenerAndCallImmediately(
			(_, value) => {
				setSelected(value);
			},
			pageExtractor,
			bindingPathPath,
		);
	}, [bindingPathPath]);

	useEffect(() => {
		if (!searchBindingPath) return;
		addListenerAndCallImmediately(
			(_, value) => {
				setSearchText(value ?? '');
			},
			pageExtractor,
			searchBindingPath,
		);
	}, [searchBindingPath]);

	const dropdownData = React.useMemo(
		() =>
			Array.from(
				getRenderData(
					data,
					datatype,
					uniqueKeyType,
					uniqueKey,
					selectionType,
					selectionKey,
					labelKeyType,
					labelKey,
				)
					.reduce((acc: Map<string, any>, each: any) => {
						if (!each?.key) return acc;

						acc.set(each.key, each);

						return acc;
					}, new Map())
					.values(),
			),
		[
			data,
			datatype,
			uniqueKeyType,
			uniqueKey,
			selectionType,
			selectionKey,
			labelKeyType,
			labelKey,
		],
	);

	const selectedDataKey: Array<any> | string | undefined = React.useMemo(
		() => getSelectedKeys(dropdownData, selected, isMultiSelect),
		[selected],
	);

	const getIsSelected = (key: any) => {
		if (!isMultiSelect) return deepEqual(selectedDataKey, key);
		if (Array.isArray(selectedDataKey))
			return !!selectedDataKey.find((e: any) => deepEqual(e, key));
		return false;
	};

	const handleClick = async (each: { key: any; label: any; value: any } | undefined) => {
		if (!each) return;
		if (isMultiSelect) {
			let newSelectionIndex = (selected ?? []).findIndex((e: any) =>
				deepEqual(e, each.value),
			);
			setData(
				bindingPathPath,
				newSelectionIndex === -1
					? [...(selected ?? []), each.value]
					: selected.filter((_: any, i: number) => i !== newSelectionIndex),
				context.pageName,
			);
		} else {
			setData(
				bindingPathPath,
				deepEqual(selected, each.value) ? undefined : each.value,
				context?.pageName,
			);
		}
		if (clickEvent) {
			await runEvent(
				clickEvent,
				key,
				context.pageName,
				props.locationHistory,
				props.pageDefinition,
			);
		}
		if (!isMultiSelect) handleClose();
	};

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setData(searchBindingPath, event.target.value, context.pageName);
	};

	React.useEffect(() => {
		if (!onSearch) return;
		(async () =>
			await runEvent(
				searchEvent,
				key,
				context.pageName,
				locationHistory,
				props.pageDefinition,
			))();
	}, [searchText, searchEvent, locationHistory, props.pageDefinition]);

	React.useEffect(() => {
		if (onSearch) return;
		let searchExpression: string | RegExp;
		try {
			searchExpression = new RegExp(searchText, 'i');
		} catch (error) {
			searchExpression = '';
		}
		setSearchDropdownData(
			dropdownData
				.filter(e => !isNullValue(e?.label))
				.filter(e => (e?.label + '').search(searchExpression) !== -1),
		);
	}, [searchText, dropdownData]);

	const handleClose = useCallback(() => {
		if (!showDropdown) return;
		setShowDropdown(false);
		setFocus(false);
		inputRef?.current?.blur();
		clearSearchTextOnClose && setSearchText('');
	}, [showDropdown, setShowDropdown, setFocus, inputRef, clearSearchTextOnClose, setSearchText]);

	const getLabel = useCallback(() => {
		let label = '';
		if (!selected || (Array.isArray(selected) && !selected.length)) {
			return '';
		}
		if (!isMultiSelect) {
			label = dropdownData?.find((each: any) => each?.key === selectedDataKey)?.label;
			if (!label && searchEvent) {
				label = selected?.label;
			}
			return label;
		}

		return `${selectedDataKey?.length} Item${
			(selectedDataKey?.length ?? 0) > 1 ? 's' : ''
		}  selected`;
	}, [selected, selectedDataKey, dropdownData, isMultiSelect]);
	const computedStyles = processComponentStylePseudoClasses(
		props.pageDefinition,
		{ focus, readOnly },
		stylePropertiesWithPseudoStates,
	);

	useEffect(() => {
		if (!validation?.length) return;

		const msgs = validate(
			props.definition,
			props.pageDefinition,
			validation,
			selected,
			locationHistory,
			pageExtractor,
		);
		setValidationMessages(msgs);

		setData(
			`Store.validations.${context.pageName}.${flattenUUID(definition.key)}`,
			msgs.length ? msgs : undefined,
			context.pageName,
			true,
		);
		return () =>
			setData(
				`Store.validations.${context.pageName}.${flattenUUID(definition.key)}`,
				undefined,
				context.pageName,
				true,
			);
	}, [selected, validation]);

	useEffect(() => {
		if (!showDropdown || closeOnMouseLeave) return;
		window.addEventListener('mousedown', handleClose);
		return () => window.removeEventListener('mousedown', handleClose);
	}, [showDropdown, searchText, handleClose, closeOnMouseLeave]);

	const scrollEndEvent =
		onScrollReachedEnd && props.pageDefinition.eventFunctions[onScrollReachedEnd]
			? async (e: UIEvent<HTMLDivElement>) => {
					const target = e.target as HTMLDivElement;

					if (Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) > 2)
						return;

					await runEvent(
						props.pageDefinition.eventFunctions[onScrollReachedEnd],
						key,
						context.pageName,
						locationHistory,
						props.pageDefinition,
					);
			  }
			: undefined;

	return (
		<CommonInputText
			id={key}
			cssPrefix="comp compDropdown"
			noFloat={noFloat}
			readOnly={readOnly}
			value={getLabel()}
			label={label}
			translations={translations}
			rightIcon={showDropdown ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}
			valueType="text"
			isPassword={false}
			placeholder={placeholder}
			hasFocusStyles={stylePropertiesWithPseudoStates?.focus}
			validationMessages={validationMessages}
			context={context}
			hideClearContentIcon={true}
			blurHandler={() => setFocus(false)}
			focusHandler={() => {
				setFocus(true);
				setShowDropdown(true);
			}}
			autoComplete="off"
			styles={computedStyles}
			inputRef={inputRef}
			definition={props.definition}
			designType={designType}
			colorScheme={colorScheme}
			leftIcon={leftIcon}
			onMouseLeave={closeOnMouseLeave ? handleClose : undefined}
			updDownHandler={e => {
				if (e.key.startsWith('Arrow')) {
					if (!showDropdown) setShowDropdown(true);
					const data =
						searchDropdownData?.length || searchText
							? searchDropdownData
							: dropdownData;
					if (!data?.length) {
						setHoverKey(undefined);
						return;
					}
					let index = data?.findIndex(e => e?.key === hoverKey);
					if (index === -1) index = e.key.endsWith('Up') ? data.length - 1 : 0;
					else index = e.key.endsWith('Up') ? index - 1 : index + 1;
					if (index < 0) index = data.length - 1;
					if (index >= data.length) index = 0;
					setHoverKey(data[index]?.key);
				} else if (e.key === 'Enter' && showDropdown && hoverKey) {
					handleClick(dropdownData.find(e => e.key === hoverKey));
				} else if (e.key === 'Escape') {
					setHoverKey(undefined);
					setShowDropdown(false);
				}
			}}
		>
			{showDropdown && (
				<div
					className="_dropdownContainer"
					style={computedStyles.dropDownContainer ?? {}}
					onScroll={scrollEndEvent}
				>
					<SubHelperComponent
						definition={props.definition}
						subComponentName="dropDownContainer"
					/>
					{isSearchable && (
						<input
							className="_dropdownSearchBox"
							value={searchText}
							placeholder={searchLabel}
							onChange={handleSearch}
							onMouseDown={e => {
								e.stopPropagation();
							}}
						/>
					)}
					{(searchDropdownData?.length || (searchText && !onSearch)
						? searchDropdownData
						: dropdownData
					)?.map(each => (
						<div
							className={`_dropdownItem ${each.key === hoverKey ? '_hover' : ''}`}
							style={computedStyles.dropdownItem ?? {}}
							key={each?.key}
							onMouseEnter={() => setHoverKey(each?.key)}
							onMouseDown={() => handleClick(each)}
						>
							<SubHelperComponent
								definition={props.definition}
								subComponentName="dropdownItem"
							/>
							<label
								style={computedStyles.dropdownItemLabel ?? {}}
								className="_dropdownItemLabel"
							>
								<SubHelperComponent
									definition={props.definition}
									subComponentName="dropdownItemLabel"
								/>
								{each?.label}
							</label>
							{getIsSelected(each?.key) && (
								<i
									className="_dropdownCheckIcon"
									style={computedStyles.dropdownCheckIcon ?? {}}
								>
									<SubHelperComponent
										definition={props.definition}
										subComponentName="dropdownCheckIcon"
									/>
								</i>
							)}
						</div>
					))}
				</div>
			)}
		</CommonInputText>
	);
}

const component: Component = {
	icon: 'fa-solid fa-square-caret-down',
	name: 'Dropdown',
	displayName: 'Dropdown',
	description: 'Dropdown component',
	component: DropdownComponent,
	styleComponent: DropdownStyle,
	styleDefaults: styleDefaults,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: propertiesDefinition,
	stylePseudoStates: ['hover', 'focus', 'disabled'],
	styleProperties: stylePropertiesDefinition,
	bindingPaths: {
		bindingPath: { name: 'Selection Binding' },
		bindingPath2: { name: 'Search Binding' },
	},
	defaultTemplate: {
		key: '',
		name: 'Dropdown',
		type: 'Dropdown',
		properties: {
			label: { value: 'Dropdown' },
		},
	},
	sections: [{ name: 'Dropdown', pageName: 'dropdown' }],
};

export default component;
