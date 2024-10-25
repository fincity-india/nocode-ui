import React, { useState, useMemo, useEffect } from 'react';
import { SimpleEditorMultipleValueType } from '.';

interface IconOption {
	name: string;
	icon: React.ReactNode;
	description?: string;
	width?: string;
	height?: string;
	viewBox?: string;
	transform?: string;
}
export type IconOptions = Array<IconOption>;

export function IconsSimpleEditor({
	options,
	selected,
	onChange,
	withBackground = false,
	multipleValueType = SimpleEditorMultipleValueType.SpaceSeparated,
	multiSelect = false,
	multiSelectWithControl = false,
	exclusiveOptions,
	combinationOptions,
	visibleIconCount,
	// gridSize,
}: Readonly<{
	options: IconOptions;
	selected: string | Array<string>;
	onChange: (v: string | Array<string>) => void;
	visibleIconCount?: number;
	withBackground?: boolean;
	multipleValueType?: SimpleEditorMultipleValueType;
	multiSelect?: boolean;
	multiSelectWithControl?: boolean;
	exclusiveOptions?: string[];
	combinationOptions?: { condition: Array<string>; name: string | Array<string> }[];
}>) {
	const [visibleIcons, setVisibleIcons] = useState<IconOptions>([]);
	const [dropdownIcons, setDropdownIcons] = useState<IconOptions>([]);

	useEffect(() => {
		const selectedSet = new Set(Array.isArray(selected) ? selected : [selected]);
		const selectedIcons = options.filter(icon => selectedSet.has(icon.name));
		const remainingIcons = options.filter(icon => !selectedSet.has(icon.name));

		if (visibleIconCount !== undefined) {
			const visibleCount = Math.min(visibleIconCount, options.length);
			const newVisibleIcons = [...selectedIcons, ...remainingIcons].slice(0, visibleCount);
			setVisibleIcons(newVisibleIcons);
			setDropdownIcons(options.filter(icon => !newVisibleIcons.includes(icon)));
		} else {
			setVisibleIcons(options);
			setDropdownIcons([]);
		}
	}, [options, visibleIconCount, selected]);

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const selection = useMemo(() => {
		if (!multiSelect && typeof selected === 'string') return new Set<string>([selected]);
		if (!selected) return new Set<string>();
		if (
			multipleValueType === SimpleEditorMultipleValueType.Array &&
			typeof selected === 'string'
		)
			return new Set<string>(selected.split(multipleValueType.toString()));
		return new Set<string>(selected);
	}, [selected, multiSelect, multipleValueType]);

	useEffect(() => {
		if (!selected && options.length > 0) {
			onChange(options[0].name);
		}
	}, []);

	const handleSelection = (ev: React.MouseEvent<HTMLButtonElement>, option: IconOption) => {
		if (!multiSelect) {
			onChange(selected === option.name ? '' : option.name);
		} else {
			let arr = Array.from(selection);

			if (multiSelectWithControl && !ev.ctrlKey && !ev.metaKey) {
				arr = [option.name];
			} else {
				if (selection.has(option.name)) arr.splice(arr.indexOf(option.name), 1);
				else arr.push(option.name);
			}

			if (exclusiveOptions?.length && arr.length) {
				const optionName = exclusiveOptions.find(e => arr.includes(e));
				if (optionName) arr = [optionName];
			}

			if (combinationOptions?.length && arr.length) {
				const optionName = combinationOptions.find(e =>
					e.condition.every(c => arr.includes(c)),
				);
				if (optionName)
					arr = Array.isArray(optionName.name) ? optionName.name : [optionName.name];
			}

			onChange(
				multipleValueType === SimpleEditorMultipleValueType.Array
					? arr
					: arr.join(multipleValueType.toString()),
			);
		}

		setIsDropdownOpen(false);

		const newVisibleIcons = [
			option,
			...visibleIcons.filter(icon => icon.name !== option.name),
		].slice(0, visibleIconCount);
		const newDropdownIcons = [...options.filter(icon => !newVisibleIcons.includes(icon))];
		setVisibleIcons(newVisibleIcons);
		setDropdownIcons(newDropdownIcons);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className={`_simpleEditorIcons ${withBackground ? '_bground' : ''}`}>
			{visibleIcons.map((e, i) => {
				const activeClass = selection.has(e.name) ? '_active' : '';
				return (
					<button
						key={e.name}
						className={`_eachIcon ${activeClass}`}
						onClick={ev => handleSelection(ev, e)}
						title={e.description}
					>
						<svg
							width={e.width ?? '32'}
							height={e.height ?? '32'}
							viewBox={
								e.viewBox ? e.viewBox : `0 0 ${e.width ?? '32'} ${e.height ?? '32'}`
							}
							fill="none"
							className={activeClass}
							transform={e.transform}
						>
							{e.icon}
						</svg>
					</button>
				);
			})}
			{dropdownIcons.length > 0 && (
				<div className="_iconDropdown">
					<label
						className={`_dropdownToggle ${isDropdownOpen ? '_open' : ''}`}
						onClick={toggleDropdown}
					>
						More
						<svg
							width="8"
							height="4"
							viewBox="0 0 8 4"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4.56629 3.80476C4.56548 3.80476 4.5647 3.80505 4.56408 3.80556C4.25163 4.06508 3.74506 4.06481 3.43301 3.80476L0.234347 1.13914C0.00444266 0.947547 -0.0630292 0.662241 0.0619187 0.412339C0.186867 0.162436 0.476746 5.68513e-09 0.80161 9.5591e-09L7.19894 8.58465e-08C7.52131 8.96907e-08 7.81369 0.162437 7.93863 0.412339C8.06358 0.662241 7.99361 0.947547 7.76621 1.13914L4.5685 3.80396C4.56788 3.80448 4.5671 3.80476 4.56629 3.80476Z"
								fill="#CCCCCC"
							/>
						</svg>
					</label>
					{isDropdownOpen && (
						<div className="_dropdownContent">
							{dropdownIcons.map((e, i) => {
								const activeClass = selection.has(e.name) ? '_active' : '';
								return (
									<button
										key={e.name}
										className={`_eachIcon ${activeClass}`}
										onClick={ev => handleSelection(ev, e)}
										title={e.description}
									>
										<svg
											width={e.width ?? '32'}
											height={e.height ?? '32'}
											viewBox={
												e.viewBox
													? e.viewBox
													: `0 0 ${e.width ?? '32'} ${e.height ?? '32'}`
											}
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											className={activeClass}
											transform={e.transform}
										>
											{e.icon}
										</svg>
										<span className="_iconName">{e.name}</span>
									</button>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
