import React, { useEffect, useState } from 'react';
import { Dropdown } from './Dropdown';
import { RangeSlider } from './RangeSlider';

export function PixelSize({
	value = '',
	onChange,
	placeholder,
	min = 0,
	max = 100,
	autofocus = false,
	hideSlider = false,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	min?: number;
	max?: number;
	autofocus?: boolean;
	hideSlider?: boolean;
}) {
	return (
		<GenericRangeSlider
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			min={min}
			max={max}
			autofocus={autofocus}
			hideSlider={hideSlider}
			unitOptions={[
				{ name: 'px', displayName: 'px' },
				{ name: 'vw', displayName: 'vw' },
				{ name: 'vh', displayName: 'vh' },
				{ name: 'vmin', displayName: 'vmin' },
				{ name: 'vmax', displayName: 'vmax' },
				{ name: '%', displayName: '%' },
				{ name: 'em', displayName: 'em' },
				{ name: 'rem', displayName: 'rem' },
				{ name: 'cm', displayName: 'cm' },
				{ name: 'mm', displayName: 'mm' },
				{ name: 'in', displayName: 'in' },
				{ name: 'pt', displayName: 'pt' },
				{ name: 'pc', displayName: 'pc' },
				{ name: 'ex', displayName: 'ex' },
				{ name: 'ch', displayName: 'ch' },
			]}
		/>
	);
}

export function TimeSize({
	value = '',
	onChange,
	placeholder,
	min,
	max,
	autofocus = false,
	hideSlider = false,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	min?: number;
	max?: number;
	autofocus?: boolean;
	hideSlider?: boolean;
}) {
	return (
		<GenericRangeSlider
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			min={min ?? 0}
			max={max ?? value?.toLowerCase()?.endsWith('ms') ? 10000 : 10}
			autofocus={autofocus}
			hideSlider={hideSlider}
			unitOptions={[
				{ name: 's', displayName: 'Sec' },
				{ name: 'ms', displayName: 'MS' },
			]}
		/>
	);
}

function GenericRangeSlider({
	value = '',
	onChange,
	placeholder,
	min = 0,
	max = 100,
	unitOptions,
	autofocus = false,
	hideSlider = false,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder?: string;
	min?: number;
	max?: number;
	unitOptions: { name: string; displayName: string }[];
	autofocus?: boolean;
	hideSlider?: boolean;
}) {
	let num = '';
	let unit = unitOptions[0].name;

	if (value) {
		num = value.replace(/[a-zA-Z% ]/g, '');
		unit = value.replace(/[0-9. ]/g, '').toLowerCase();
	}

	const [inNum, setInNum] = useState(num);

	useEffect(() => {
		setInNum(num);
	}, [num]);

	let slider = undefined;
	if (!hideSlider) {
		slider = (
			<RangeSlider
				value={Number(inNum)}
				onChange={v => onChange(String(v) + unit)}
				min={min}
				max={max}
				step={1}
			/>
		);
	}

	return (
		<div className="_simpleEditorPixelSize">
			{slider}
			<div className="_inputDropdownContainer">
				<input
					tabIndex={0}
					type="text"
					value={inNum}
					placeholder={placeholder}
					onChange={e => setInNum(e.target.value)}
					autoFocus={autofocus}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							if (isNaN(Number(inNum)) || inNum == '') onChange(inNum);
							else onChange(inNum + unit);
							setInNum(inNum.replace(/[a-zA-Z% ]/g, ''));
						} else if (e.key === 'Escape') setInNum(num);
						else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
							e.preventDefault();
							if (isNaN(Number(inNum))) setInNum(inNum);
							else
								setInNum(
									String(
										Math.round(
											(Number(inNum) + (e.key === 'ArrowDown' ? -1 : 1)) *
												100,
										) / 100,
									),
								);
						}
					}}
					onBlur={() => {
						if (isNaN(Number(inNum)) || inNum == '') onChange(inNum);
						else onChange(inNum + unit);
					}}
				/>
				<Dropdown
					value={unit}
					onChange={v => onChange(num + v)}
					options={unitOptions}
					showNoneLabel={false}
				/>
			</div>
		</div>
	);
}
