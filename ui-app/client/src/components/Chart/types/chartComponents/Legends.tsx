import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { ChartData, ChartProperties, Dimension } from '../common';
import { shortUUID } from '../../../../util/shortUUID';
import { deepEqual, duplicate } from '@fincity/kirun-js';

const RECT_WIDTH = 20;
const RECT_HEIGHT = 10;
const SPACE = 10;

interface LegendGroupItem {
	label: string;
	labelDimension: Dimension;
	rectDimension: Dimension;
	color: string;
	fillOpacity: number;
	strokeOpacity: number;
	id?: string;
	animationId?: string;
}

interface LegendRowColumn {
	size: number;
	maxSize: number;
	legends: Array<LegendGroupItem>;
}

export default function Legends({
	chartDimension,
	legendDimension,
	properties,
	chartData,
	onLegendDimensionChange,
	labelStyles,
	rectangleStyles,
}: Readonly<{
	chartDimension: Dimension;
	legendDimension: Dimension;
	properties: ChartProperties;
	chartData: ChartData | undefined;
	onLegendDimensionChange: (d: Dimension) => void;
	labelStyles: CSSProperties;
	rectangleStyles: CSSProperties;
}>) {
	const labelWidthRef = useRef<SVGTextElement>(null);

	const [legends, setLegends] = useState<LegendGroupItem[]>([]);

	const refs = useRef<{ labels: (SVGTextElement | null)[]; rects: (SVGElement | null)[] }>({
		labels: [],
		rects: [],
	});

	const [somethingChanged, setSomethingChanged] = useState(Date.now());

	useEffect(() => {
		if (
			properties.legendPosition === 'none' ||
			chartDimension.width <= 0 ||
			chartDimension.height <= 0
		) {
			if (legendDimension.width !== 0 || legendDimension.height !== 0)
				onLegendDimensionChange({ width: 0, height: 0 });
			return;
		}

		if (!labelWidthRef?.current) return;

		const legendGroups: Array<LegendGroupItem> = makeLegendItems(
			chartData,
			properties,
			labelWidthRef,
		);

		const legendRowsColumnns: Array<LegendRowColumn> = arrangeInRowsOrColumns(
			properties,
			chartDimension,
			legendGroups,
		);

		const newDimension = positionLegends(legendRowsColumnns, chartDimension, properties);

		if (
			legendDimension.width !== newDimension.width ||
			legendDimension.height !== newDimension.height
		) {
			onLegendDimensionChange(newDimension);
		}

		setLegends(old => {
			let i = 0;

			for (; i < legendGroups.length; i++) {
				const hasOldObj = !!old[i];
				legendGroups[i].id = hasOldObj ? old[i].id : shortUUID();
				if (!legendGroups[i].rectDimension.from)
					legendGroups[i].rectDimension.from = { x: 0, y: 0 };
				if (!legendGroups[i].labelDimension.from)
					legendGroups[i].labelDimension.from = { x: 0, y: 0 };

				if (!hasOldObj) continue;
				legendGroups[i].rectDimension.from!.x =
					(old[i].rectDimension.x === legendGroups[i].rectDimension.x
						? old[i].rectDimension.from!.x
						: old[i].rectDimension.x) ?? 0;
				legendGroups[i].rectDimension.from!.y =
					(old[i].rectDimension.y === legendGroups[i].rectDimension.y
						? old[i].rectDimension.from!.y
						: old[i].rectDimension.y) ?? 0;

				legendGroups[i].labelDimension.from!.x =
					(old[i].labelDimension.x === legendGroups[i].labelDimension.x
						? old[i].labelDimension.from!.x
						: old[i].labelDimension.x) ?? 0;
				legendGroups[i].labelDimension.from!.y =
					(old[i].labelDimension.y === legendGroups[i].labelDimension.y
						? old[i].labelDimension.from!.y
						: old[i].labelDimension.y) ?? 0;

				legendGroups[i].animationId = old[i].animationId;
			}

			const horizontal =
				properties.legendPosition === 'top' || properties.legendPosition === 'bottom';

			for (; i < old.length; i++) {
				legendGroups.push(duplicate(old[i]));
				if (!legendGroups[i].rectDimension.from)
					legendGroups[i].rectDimension.from = { x: 0, y: 0 };
				if (!legendGroups[i].labelDimension.from)
					legendGroups[i].labelDimension.from = { x: 0, y: 0 };

				legendGroups[i].rectDimension.from!.x = old[i].rectDimension.x ?? 0;
				legendGroups[i].rectDimension.from!.y = old[i].rectDimension.y ?? 0;

				legendGroups[i].labelDimension.from!.x = old[i].labelDimension.x ?? 0;
				legendGroups[i].labelDimension.from!.y = old[i].labelDimension.y ?? 0;

				legendGroups[i].rectDimension.x = horizontal ? -100 : old[i].rectDimension.x ?? 0;
				legendGroups[i].rectDimension.y = horizontal ? old[i].rectDimension.y ?? 0 : -100;

				legendGroups[i].labelDimension.x = horizontal ? -100 : old[i].labelDimension.x ?? 0;
				legendGroups[i].labelDimension.y = horizontal ? old[i].labelDimension.y ?? 0 : -100;
				legendGroups[i].animationId = old[i].animationId;
			}

			if (deepEqual(old, legendGroups)) return old;
			console.log(`Setting...`, duplicate(old), duplicate(legendGroups));
			legendGroups.forEach(e => (e.animationId = shortUUID()));
			return legendGroups;
		});
	}, [
		labelWidthRef?.current,
		chartDimension,
		chartData,
		properties.legendPosition,
		properties.disableLegendInteraction,
		labelStyles,
		setLegends,
	]);

	useEffect(() => {
		if (!legends.length || !refs.current.labels.length || !refs.current.rects.length) return;

		for (let i = 0; i < legends.length; i++) {
			const legend = legends[i];
			const label = refs.current.labels[i];
			const rect = refs.current.rects[i];

			if (label) {
				window.requestAnimationFrame(() =>
					label.animate(
						[
							{
								x: legend.labelDimension.from?.x ?? 0,
								y: legend.labelDimension.from?.y ?? 0,
							},
							{
								x: legend.labelDimension.x,
								y: legend.labelDimension.y,
							},
						],
						{
							duration: properties.animationTime,
							easing: properties.animationTimingFunction,
							fill: 'forwards',
						},
					),
				);
			}

			if (rect) {
				window.requestAnimationFrame(() =>
					rect.animate(
						[
							{
								x: legend.rectDimension.from?.x ?? 0,
								y: legend.rectDimension.from?.y ?? 0,
							},
							{
								x: legend.rectDimension.x,
								y: legend.rectDimension.y,
							},
						],
						{
							duration: properties.animationTime,
							easing: properties.animationTimingFunction,
							fill: 'forwards',
						},
					),
				);
			}
		}
	}, [somethingChanged, legends, properties.animationTime, properties.animationTimingFunction]);

	if (
		chartDimension.width <= 0 ||
		chartDimension.height <= 0 ||
		properties.legendPosition === 'none'
	)
		return <></>;

	return (
		<>
			<text
				x={0}
				y={0}
				style={{ ...labelStyles, transition: 'none' }}
				fillOpacity={0}
				strokeOpacity={0}
				ref={labelWidthRef}
			></text>
			{legends.map((legend, index) => (
				<>
					<rect
						key={`${legend.id}_rect`}
						className={`${legend.animationId}_rect`}
						width={legend.rectDimension.width}
						height={legend.rectDimension.height}
						fill={legend.color}
						fillOpacity={legend.fillOpacity}
						strokeOpacity={legend.strokeOpacity}
						style={rectangleStyles}
						x={legend.rectDimension.from?.x ?? 0}
						y={legend.rectDimension.from?.y ?? 0}
						ref={e => {
							refs.current.rects[index] = e;
						}}
					/>
					<text
						key={`${legend.id}_text`}
						className="legendText"
						width={legend.labelDimension.width}
						height={legend.labelDimension.height}
						style={labelStyles}
						fill="currentColor"
						alignmentBaseline="before-edge"
						x={legend.labelDimension.from?.x ?? 0}
						y={legend.labelDimension.from?.y ?? 0}
						ref={e => {
							refs.current.labels[index] = e;
						}}
					>
						{legend.label}
					</text>
				</>
			))}
		</>
	);
}

function positionLegends(
	legendRowsColumnns: Array<LegendRowColumn>,
	chartDimension: Dimension,
	properties: ChartProperties,
): Dimension {
	const horizontal =
		properties.legendPosition === 'top' || properties.legendPosition === 'bottom';

	let x = 0,
		y = 0;

	let start = 0;
	if (properties.legendPosition === 'bottom')
		start = y =
			chartDimension.height -
			legendRowsColumnns.reduce(
				(acc, rowColumn) =>
					acc +
					Math.max(
						...rowColumn.legends.map(e =>
							e.labelDimension.height > e.rectDimension.height
								? e.labelDimension.height
								: e.rectDimension.height,
						),
					),
				0,
			) -
			(legendRowsColumnns.length - 1) * SPACE;
	else if (properties.legendPosition === 'right')
		start = x =
			chartDimension.width -
			legendRowsColumnns.reduce(
				(acc, rowColumn) =>
					acc +
					Math.max(
						...rowColumn.legends.map(
							e => e.labelDimension.width + SPACE + e.rectDimension.width,
						),
					),
				0,
			) -
			(legendRowsColumnns.length - 1) * SPACE;

	for (let i = 0; i < legendRowsColumnns.length; i++) {
		const rowColumn = legendRowsColumnns[i];
		if (horizontal) x = Math.round((chartDimension.width - rowColumn.size) / 2);
		else y = Math.round((chartDimension.height - rowColumn.size) / 2);

		let maxSize = 0;
		for (let j = 0; j < rowColumn.legends.length; j++) {
			const legend = rowColumn.legends[j];
			const maxLegenedHeight = Math.max(
				legend.labelDimension.height,
				legend.rectDimension.height,
			);
			legend.rectDimension.x = x;
			legend.rectDimension.y =
				y + Math.round((maxLegenedHeight - legend.rectDimension.height) / 2);
			legend.labelDimension.x = x + RECT_WIDTH + SPACE;
			legend.labelDimension.y =
				y + Math.round((maxLegenedHeight - legend.labelDimension.height) / 2);
			if (horizontal) {
				x += legend.labelDimension.width + SPACE + legend.rectDimension.width + SPACE;
				maxSize = Math.max(maxSize, maxLegenedHeight);
			} else {
				y += maxLegenedHeight + SPACE;
				maxSize = Math.max(
					maxSize,
					legend.labelDimension.width + SPACE + legend.rectDimension.width,
				);
			}
		}

		if (horizontal) y += maxSize + SPACE;
		else x += maxSize + SPACE;
	}

	const width = horizontal ? chartDimension.width : x - legendRowsColumnns.length * SPACE - start;
	const height = horizontal ? y - SPACE - start : chartDimension.height;

	return { width, height };
}

function arrangeInRowsOrColumns(
	properties: ChartProperties,
	chartDimension: Dimension,
	labelGroups: LegendGroupItem[],
): Array<LegendRowColumn> {
	let horizontal = properties.legendPosition === 'top' || properties.legendPosition === 'bottom';
	let rowsColumns: Array<{ size: number; maxSize: number; legends: Array<LegendGroupItem> }> = [];
	let rowColumnNumber = 0;
	let rowColumnSize = 0;
	let currentRowColumn: Array<LegendGroupItem> = [];
	let columnRowMaxSize = 0;

	const AVAILABLE_SIZE = horizontal ? chartDimension.width : chartDimension.height;

	for (const element of labelGroups) {
		let size = horizontal
			? element.labelDimension.width + SPACE + element.rectDimension.width
			: element.labelDimension.height > element.rectDimension.height
			? element.labelDimension.height
			: element.rectDimension.height;

		if (rowColumnSize + size >= AVAILABLE_SIZE) {
			rowsColumns.push({
				size: rowColumnSize - (currentRowColumn.length === 1 ? 0 : SPACE),
				maxSize: columnRowMaxSize,
				legends: currentRowColumn,
			});
			rowColumnNumber++;
			rowColumnSize = 0;
			columnRowMaxSize = 0;
			currentRowColumn = [];
		}

		rowColumnSize += size + SPACE;
		columnRowMaxSize = Math.max(columnRowMaxSize, size);
		currentRowColumn.push(element);
	}

	if (currentRowColumn.length)
		rowsColumns.push({
			size: rowColumnSize,
			maxSize: columnRowMaxSize,
			legends: currentRowColumn,
		});

	return rowsColumns;
}

function makeLegendItems(
	chartData: ChartData | undefined,
	properties: ChartProperties,
	labelWidthRef: React.RefObject<SVGTextElement>,
) {
	const labelGroups: Array<LegendGroupItem> = [];
	if (!labelWidthRef.current) return labelGroups;

	for (let i = 0; i < (chartData?.yAxisData?.length ?? 0); i++) {
		const label = properties?.dataSetLabels?.[i] ?? `Data set ${i}`;
		labelWidthRef.current.innerHTML = label;
		const { width, height } = labelWidthRef.current.getBoundingClientRect();
		const labelDimension = { width: Math.round(width), height: Math.round(height) };
		const rectDimension = { width: RECT_WIDTH, height: RECT_HEIGHT };

		labelGroups.push({
			label,
			labelDimension,
			rectDimension,
			color: chartData?.dataColors?.[i]?.safeGet(0) ?? 'black',
			fillOpacity: chartData?.fillOpacity?.[i]?.safeGet(0) ?? 1,
			strokeOpacity: chartData?.strokeOpacity?.[i]?.safeGet(0) ?? 1,
		});
	}
	return labelGroups;
}
