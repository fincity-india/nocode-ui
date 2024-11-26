import {
	ExecutionGraph,
	Function,
	FunctionDefinition,
	FunctionExecutionParameters,
	HybridRepository,
	KIRuntime,
	LinkedList,
	Repository,
	Schema,
	StatementExecution,
	TokenValueExtractor,
	isNullValue,
} from '@fincity/kirun-js';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	PageStoreExtractor,
	addListenerAndCallImmediately,
	addListenerAndCallImmediatelyWithChildrenActivity,
	getPathFromLocation,
	setData,
} from '../../context/StoreContext';
import { UIFunctionRepository } from '../../functions';
import { UISchemaRepository } from '../../schemas/common';
import { Component, ComponentPropertyDefinition, ComponentProps } from '../../types/common';
import { duplicate } from '@fincity/kirun-js';
import { UIError, toUIError } from '../util/errorHandling';
import useDefinition from '../util/useDefinition';
import { propertiesDefinition, stylePropertiesDefinition } from './KIRunEditorProperties';
import KIRunEditorStyle from './KIRunEditorStyle';
import { generateColor } from './colors';
import ExecutionGraphLines from './components/ExecutionGraphLines';
import KIRunContextMenu from './components/KIRunContextMenu';
import Search from './components/Search';
import StatementNode from './components/StatementNode';
import { StoreNode } from './components/StoreNode';
import { correctStatementNames, makeObjectPaths, savePersonalizationCurry } from './utils';
import StatementParameters from './components/StatementParameters';
import FunctionDetialsEditor from './components/FunctionDetailsEditor';
import { HelperComponent } from '../HelperComponents/HelperComponent';
import { processComponentStylePseudoClasses } from '../../util/styleProcessor';
import { REPO_SERVER, RemoteRepository } from '../../Engine/RemoteRepository';
import { styleDefaults } from './KIRunEditorStyleProperties';
import { editor } from 'monaco-editor';
import { IconHelper } from '../util/IconHelper';

const gridSize = 20;

function makePositions(
	executionPlan: ExecutionGraph<string, StatementExecution> | UIError | undefined | undefined,
	setPositions: (p: Map<string, { left: number; top: number }>) => void,
) {
	if (!executionPlan) return;
	if ('message' in executionPlan) return;

	const positions: Map<string, { left: number; top: number }> = new Map();
	const list = new LinkedList(executionPlan.getVerticesWithNoIncomingEdges());
	const finishedSet = new Set<string>();
	let firstLeft = 20;
	let firstTop = 20;
	while (!list.isEmpty()) {
		const v = list.removeFirst();
		const s = v.getData().getStatement();
		finishedSet.add(s.getStatementName());
		if (v.getOutVertices().size) {
			list.addAll(
				Array.from(v.getOutVertices().values())
					.flatMap(e => Array.from(e))
					.filter(e => !finishedSet.has(e.getData().getStatement().getStatementName())),
			);
		}

		if (
			isNullValue(s.getPosition()) ||
			((s.getPosition()?.getLeft() ?? 0) <= 0 && (s.getPosition()?.getTop() ?? 0) <= 0)
		) {
			if (!v.getInVertices() || !v.getInVertices().size) {
				positions.set(s.getStatementName(), { left: firstLeft, top: firstTop });
				firstTop += 100;
			}
			continue;
		}
	}

	setPositions(positions);
}

function makeUpdates(
	inFunDef: FunctionDefinition | undefined,
	setExecutionPlan: (p: ExecutionGraph<string, StatementExecution> | UIError | undefined) => void,
	setKirunMessages: (p: Map<string, string[]>) => void,
	functionRepository: Repository<Function>,
	schemaRepository: Repository<Schema>,
	key: string,
	tokenValueExtractors: Map<string, TokenValueExtractor>,
	setPositions: (p: Map<string, { left: number; top: number }>) => void,
) {
	if (isNullValue(inFunDef)) {
		setExecutionPlan(undefined);
		return;
	}

	(async () => {
		const fep = new FunctionExecutionParameters(functionRepository, schemaRepository, key);

		if (tokenValueExtractors.size) {
			fep.setValuesMap(tokenValueExtractors);
		}

		try {
			const ep = await new KIRuntime(
				inFunDef!,
				globalThis.isDesignMode || globalThis.isDebugMode,
			).getExecutionPlan(functionRepository, schemaRepository);
			setExecutionPlan(ep);
			makePositions(ep, setPositions);

			const map = new Map();
			Array.from(ep.getNodeMap().values()).forEach(e => {
				map.set(
					e.getData().getStatement().getStatementName(),
					e
						.getData()
						.getMessages()
						.map(m => m.getMessage()),
				);
			});

			setKirunMessages(map);
		} catch (err) {
			setExecutionPlan(toUIError(err));
		}
	})();
}

function KIRunEditor(
	props: ComponentProps & {
		functionRepository?: Repository<Function>;
		schemaRepository?: Repository<Schema>;
		tokenValueExtractors?: Map<string, TokenValueExtractor>;
		stores?: Array<string>;
		storePaths?: Set<string>;
		hideArguments?: boolean;
		functionKey?: string;
	},
) {
	const {
		definition: { bindingPath, bindingPath2 },
		definition,
		context,
		locationHistory,
		functionRepository: actualFunctionRepository,
		schemaRepository: actualSchemaRepository,
		tokenValueExtractors = new Map(),
		storePaths = new Set(),
		pageDefinition,
	} = props;
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const {
		key,
		stylePropertiesWithPseudoStates,
		properties: {
			readOnly,
			editorType,
			onDeletePersonalization,
			onChangePersonalization,
			clientCode,
			appCode,
		} = {},
	} = useDefinition(
		definition,
		propertiesDefinition,
		stylePropertiesDefinition,
		locationHistory,
		pageExtractor,
	);
	const bindingPathPath = bindingPath
		? getPathFromLocation(bindingPath!, locationHistory, pageExtractor)
		: undefined;

	const isReadonly = readOnly || !bindingPathPath;

	// Getting function definition.
	const [rawDef, setRawDef] = useState<any>();
	const [name, setName] = useState<string>();
	const [selectedStatements, setSelectedStatements] = useState<Map<string, boolean>>(new Map());
	const [editParameters, setEditParameters] = useState<string>('');
	const [error, setError] = useState<any>();
	const [funDef, setFunDef] = useState<FunctionDefinition | undefined>();

	const functionRepository: Repository<Function> = useMemo(() => {
		if (actualFunctionRepository) return actualFunctionRepository;

		if (editorType === 'ui') {
			return new HybridRepository<Function>(
				UIFunctionRepository,
				RemoteRepository.getRemoteFunctionRepository(
					appCode,
					clientCode,
					false,
					REPO_SERVER.UI,
				),
				RemoteRepository.getRemoteFunctionRepository(
					appCode,
					clientCode,
					false,
					REPO_SERVER.CORE,
				),
			);
		} else if (editorType === 'core') {
			return RemoteRepository.getRemoteFunctionRepository(
				appCode,
				clientCode,
				true,
				REPO_SERVER.CORE,
			);
		}

		return UIFunctionRepository;
	}, [actualFunctionRepository, appCode, clientCode, editorType]);

	const schemaRepository: Repository<Schema> = useMemo(() => {
		if (actualSchemaRepository) return actualSchemaRepository;

		if (editorType === 'ui') {
			return new HybridRepository<Schema>(
				UISchemaRepository,
				RemoteRepository.getRemoteSchemaRepository(
					appCode,
					clientCode,
					false,
					REPO_SERVER.UI,
				),
				RemoteRepository.getRemoteSchemaRepository(
					appCode,
					clientCode,
					false,
					REPO_SERVER.CORE,
				),
			);
		} else if (editorType === 'core') {
			return RemoteRepository.getRemoteSchemaRepository(
				appCode,
				clientCode,
				true,
				REPO_SERVER.CORE,
			);
		}
		return UISchemaRepository;
	}, [actualSchemaRepository, appCode, clientCode, editorType]);

	useEffect(() => {
		if (!bindingPathPath) return;
		return addListenerAndCallImmediatelyWithChildrenActivity(
			(_, v) => {
				const hereDef = correctStatementNames(v);
				setRawDef(hereDef);
				try {
					const inFunDef = isNullValue(hereDef)
						? undefined
						: FunctionDefinition.from(hereDef);
					setFunDef(inFunDef);
					makeUpdates(
						inFunDef,
						setExecutionPlan,
						setKirunMessages,
						functionRepository,
						schemaRepository,
						key,
						tokenValueExtractors,
						setPositions,
					);
					setError(undefined);
				} catch (error) {
					setError(error);
				}
				const finName = `${hereDef.namespace ?? '_'}.${hereDef.name}`;
				if (name !== finName) {
					setName(finName);
					setEditParameters('');
					setSelectedStatements(new Map());
				}
			},
			pageExtractor,
			bindingPathPath,
		);
	}, [bindingPathPath, setRawDef, pageExtractor, name, setName, setSelectedStatements]);

	const personalizationPath = bindingPath2
		? getPathFromLocation(bindingPath2!, locationHistory, pageExtractor)
		: undefined;
	const [preference, setPreference] = useState<any>({});
	useEffect(() => {
		if (!personalizationPath) return;
		return addListenerAndCallImmediatelyWithChildrenActivity(
			(_, v) => setPreference({ ...(v ?? {}) }),
			pageExtractor,
			personalizationPath,
		);
	}, [personalizationPath, setPreference, pageExtractor]);

	// Making an executionPlan to show the execution graph.
	const [executionPlan, setExecutionPlan] = useState<
		ExecutionGraph<string, StatementExecution> | UIError | undefined
	>();
	const [kirunMessages, setKirunMessages] = useState<Map<string, string[]>>(new Map());
	useEffect(() => {}, [
		funDef,
		functionRepository,
		schemaRepository,
		tokenValueExtractors,
		key,
		setExecutionPlan,
		setKirunMessages,
		isDesignMode,
		isDebugMode,
	]);

	// TODO: Calculating the positions of each statement
	const [positions, setPositions] = useState<Map<string, { left: number; top: number }>>(
		new Map(),
	);

	let statements: Array<ReactNode> = [];

	const selectStatement = useCallback(
		(append: boolean, statementName: string, selectOverride: boolean = false) => {
			if (!append) {
				setSelectedStatements(new Map([[statementName, true]]));
			} else {
				const newSelectedStatements = new Map(selectedStatements);
				if (!selectOverride && newSelectedStatements.has(statementName))
					newSelectedStatements.delete(statementName);
				else newSelectedStatements.set(statementName, true);
				setSelectedStatements(newSelectedStatements);
			}
		},
		[selectedStatements, setSelectedStatements],
	);

	const container = useRef<HTMLDivElement>(null);
	const [dragNode, setDragNode] = useState<
		| {
				left: number;
				top: number;
				dLeft?: number;
				dTop?: number;
		  }
		| undefined
	>();

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
		preference,
		personalizationPath,
		context,
		onChangePersonalization,
		locationHistory,
		pageDefinition,
	]);

	const [functionNames, setFunctionNames] = useState<string[]>([]);

	useEffect(() => {
		(async () => {
			const filterNames = await functionRepository.filter('');
			setFunctionNames(filterNames);
		})();
	}, [functionRepository, setFunctionNames]);
	const [dragDependencyNode, setDragDependencyNode] = useState<any>();
	const [dragDependencyTo, setDragDependencyTo] = useState<any>();

	const deleteStatements = useCallback(
		(stmts: string[]) => {
			if (isReadonly || !stmts.length) return;
			const def = duplicate(rawDef);
			const newSelectedStatements = new Map(selectedStatements);
			for (let name of stmts) {
				delete def.steps[name];
				if (selectedStatements.has(name)) newSelectedStatements.delete(name);
				Object.values(def.steps).forEach((s: any) => {
					if (!s.dependentStatements) return;
					const keysToDelete = Object.keys(s.dependentStatements).filter(e =>
						e.startsWith(`Steps.${name}`),
					);
					keysToDelete.forEach(e => delete s.dependentStatements[e]);
				});
			}

			setSelectedStatements(newSelectedStatements);
			setData(bindingPathPath, def, context.pageName);
		},
		[bindingPathPath, rawDef, selectedStatements, isReadonly, setData, context.pageName],
	);

	const removeAllDependencies = useCallback(
		(stmt: string) => {
			if (isReadonly || !stmt) return;
			const def = duplicate(rawDef);
			delete def.steps[stmt].dependentStatements;
			setData(bindingPathPath, def, context.pageName);
		},
		[bindingPathPath, rawDef, isReadonly, setData, context.pageName],
	);

	if (executionPlan && !('message' in executionPlan) && rawDef?.steps) {
		statements = Object.keys(rawDef.steps ?? {})
			.map(k => rawDef.steps[k])
			.map((s: any) => (
				<StatementNode
					statement={s}
					position={s.position ?? positions.get(s.statementName)}
					key={s.statementName}
					functionRepository={functionRepository}
					schemaRepository={schemaRepository}
					tokenValueExtractors={tokenValueExtractors}
					onClick={(append, statementName) => {
						selectStatement(append, statementName);
						setDragNode(undefined);
					}}
					selected={selectedStatements.has(s.statementName)}
					onDragStart={(append, statementName, startPosition) => {
						if (!selectedStatements.get(statementName))
							selectStatement(append, statementName, true);
						setDragNode(startPosition);
					}}
					dragNode={dragNode}
					container={container}
					executionPlanMessage={kirunMessages.get(s.statementName)}
					onChange={stmt => {
						if (isReadonly) return;

						const def = duplicate(rawDef);
						delete def.steps[s.statementName];
						def.steps[stmt.statementName] = stmt;

						setData(bindingPathPath, def, context.pageName);
					}}
					functionNames={functionNames}
					onDelete={stmt => deleteStatements([stmt])}
					onDependencyDragStart={(pos: any) => setDragDependencyNode(pos)}
					onDependencyDrop={stmt => {
						if (!dragDependencyNode) return;
						if (isReadonly) return;
						if (dragDependencyNode.dependency?.startsWith(`Steps.${stmt}`)) return;

						const newRawDef = duplicate(rawDef);

						if (!newRawDef.steps[stmt].dependentStatements)
							newRawDef.steps[stmt].dependentStatements = {};

						newRawDef.steps[stmt].dependentStatements[dragDependencyNode.dependency] =
							true;

						setDragDependencyNode(undefined);
						setDragDependencyTo(undefined);

						setData(bindingPathPath, newRawDef, context.pageName);
					}}
					showComment={!preference.showComments}
					onEditParameters={() => setEditParameters(s.statementName)}
					showParamValues={!!preference.showParamValues}
					context={context}
					pageDefinition={pageDefinition}
					locationHistory={locationHistory}
					onRemoveAllDependencies={() => removeAllDependencies(s.statementName)}
				/>
			));
	}

	let stores: ReactNode = <></>;

	const magnification = preference.magnification ?? 1;

	if (!preference?.showStores && props.stores && props.stores.length) {
		stores = (
			<div className="_storeContainer">
				{props.stores.map(storeName => (
					<StoreNode name={storeName} key={storeName} />
				))}
			</div>
		);
	}

	const [selectionBox, setSelectionBox] = useState<any>({});
	const [scrMove, setScrMove] = useState<any>({});
	const [primedToClick, setPrimedToClick] = useState(false);
	const [showAddSearch, setShowAddSearch] = useState<{ left: number; top: number }>();

	const designerMouseDown = useCallback(
		(e: any) => {
			if (e.target === e.currentTarget) setPrimedToClick(true);
			if (!container.current) return;

			if (e.buttons !== 1) return;
			// e.preventDefault();
			if (e.altKey) {
				setScrMove({
					...scrMove,
					dragStart: true,
					startLeft: e.screenX,
					startTop: e.screenY,
					oldLeft: container.current!.scrollLeft,
					oldTop: container.current!.scrollTop,
				});
			} else {
				const rect = container.current!.getBoundingClientRect();
				const left = e.clientX - rect.left + container.current!.scrollLeft;
				const top = e.clientY - rect.top + container.current!.scrollTop;
				setSelectionBox({ selectionStart: true, left, top });
			}
		},
		[setSelectionBox, setScrMove],
	);

	const designerMouseMove = useCallback(
		(e: any) => {
			if (!container.current) return;

			setPrimedToClick(false);
			const rect = container.current.getBoundingClientRect();
			const { dragStart, startLeft, startTop, oldLeft, oldTop } = scrMove;
			if (selectionBox.selectionStart || dragNode) {
				if (e.clientY - rect.top < gridSize * 1.5)
					container.current.scrollTop -= gridSize / 2;
				else if (e.clientY - rect.top + gridSize * 1.5 > rect.height)
					container.current.scrollTop += gridSize / 2;
				if (e.clientX - rect.left < gridSize * 1.5)
					container.current.scrollLeft -= gridSize / 2;
				else if (e.clientX - rect.left + gridSize * 1.5 > rect.width)
					container.current.scrollLeft += gridSize / 2;
			}

			if (selectionBox.selectionStart) {
				e.preventDefault();
				let { left, top } = selectionBox;
				let right = e.clientX - rect.left + container.current.scrollLeft;
				let bottom = e.clientY - rect.top + container.current.scrollTop;

				setSelectionBox({
					...selectionBox,
					left,
					top,
					right,
					bottom,
				});
			} else if (scrMove.dragStart) {
				e.preventDefault();
				container.current.scrollLeft = oldLeft + (startLeft - e.screenX);
				container.current.scrollTop = oldTop + (startTop - e.screenY);
			} else if (dragNode) {
				e.preventDefault();
				const dLeft = Math.round(
					e.clientX - rect.left + container.current.scrollLeft - dragNode.left,
				);
				const dTop = Math.round(
					e.clientY - rect.top + container.current.scrollTop - dragNode.top,
				);
				setDragNode({ ...dragNode, dLeft, dTop });
			} else if (dragDependencyNode) {
				e.preventDefault();
				const dLeft = Math.round(e.clientX - rect.left + container.current.scrollLeft);
				const dTop = Math.round(e.clientY - rect.top + container.current.scrollTop);
				setDragDependencyTo({ left: dLeft, top: dTop });
			}
		},
		[
			container,
			scrMove,
			selectionBox,
			dragNode,
			rawDef,
			setRawDef,
			selectedStatements,
			dragDependencyNode,
		],
	);

	const designerMouseUp = useCallback(
		(e: any) => {
			if (e.target === e.currentTarget && primedToClick) {
				setSelectedStatements(new Map());
				setPrimedToClick(false);
			}

			if (!dragNode && !scrMove && !selectionBox) {
				setSelectedStatements(new Map());
			}

			if (selectionBox.selectionStart) {
				let { left, top, right, bottom } = selectionBox;
				if (right < left) {
					const t = left;
					left = right;
					right = t;
				}
				if (bottom < top) {
					const t = top;
					top = bottom;
					bottom = t;
				}
				const boxRect = new DOMRect(left, top, right - left, bottom - top);
				const containerRect = container.current?.getBoundingClientRect();
				if (!isNaN(boxRect.width) && !isNaN(boxRect.height)) {
					const nodes = Object.keys(rawDef?.steps || {})
						.filter(k => {
							const el = document.getElementById(`statement_${k}`);
							const rect = el?.getBoundingClientRect();
							if (!rect) return false;

							let { left, top, right, bottom, x, y } = rect;

							left +=
								(container.current?.scrollLeft || 0) - (containerRect?.left ?? 0);
							top += (container.current?.scrollTop || 0) - (containerRect?.top ?? 0);
							right +=
								(container.current?.scrollLeft || 0) - (containerRect?.left ?? 0);
							bottom +=
								(container.current?.scrollTop || 0) - (containerRect?.top ?? 0);

							if (boxRect.left > right || left > boxRect.right) return false;
							if (boxRect.top > bottom || top > boxRect.bottom) return false;

							return true;
						})
						.reduce((a, k) => {
							a.set(k, true);
							return a;
						}, new Map<string, boolean>());

					setSelectedStatements(nodes);
				} else {
					setSelectedStatements(new Map());
				}
			}

			setSelectionBox({ ...selectionBox, selectionStart: false });
			setScrMove({ ...scrMove, dragStart: false });

			setDragDependencyNode(undefined);
			setDragDependencyTo(undefined);

			if (dragNode) {
				const { dLeft, dTop } = dragNode;
				const def = duplicate(rawDef);
				if (def.steps) {
					for (const [name] of Array.from(selectedStatements)) {
						const step = def.steps[name];
						if (!step) continue;
						step.position = step.position ?? {};
						step.position.left =
							(!isNaN(step.position.left) ? step.position.left : 0) + (dLeft ?? 0);
						step.position.top =
							(!isNaN(step.position.top) ? step.position.top : 0) + (dTop ?? 0);
					}
				}

				if (!isReadonly) {
					setData(bindingPathPath, def, context.pageName);
				}
				setDragNode(undefined);
			}
		},
		[
			container,
			setDragNode,
			dragNode,
			setSelectedStatements,
			scrMove,
			selectionBox,
			rawDef,
			setRawDef,
			selectedStatements,
			isReadonly,
		],
	);

	let selector = undefined;
	if (selectionBox.selectionStart) {
		let { left, top, right, bottom } = selectionBox;
		selector = (
			<div
				className="_selectionBox"
				style={{
					left: `${Math.min(left, right) / magnification}px`,
					top: `${Math.min(top, bottom) / magnification}px`,
					width: `${Math.abs(left - right) / magnification}px`,
					height: `${Math.abs(top - bottom) / magnification}px`,
				}}
			/>
		);
	}

	// const [kirunStorePaths, setKirunStorePaths] = useState<Set<string>>(new Set());
	// useEffect(() => {
	// 	const paths = new Set<string>(storePaths);

	// 	if (!rawDef?.steps) {
	// 		setKirunStorePaths(paths);
	// 		return;
	// 	}
	// 	(async () => {
	// 		for (const step of Object.values(rawDef.steps)) {
	// 			if (isNullValue(step)) continue;

	// 			const { namespace, name, statementName } = step as any;
	// 			const func = await functionRepository.find(namespace, name);
	// 			if (!func) continue;

	// 			const prefix = `Steps.${statementName}`;

	// 			const events = func.getSignature().getEvents();
	// 			if (events.size === 0) {
	// 				paths.add(`${prefix}.output`);
	// 				continue;
	// 			}

	// 			for (const event of Array.from(events)) {
	// 				const eventName = `${prefix}.${event[1].getName()}`;
	// 				paths.add(eventName);
	// 				for (const [name, schema] of Array.from(event[1].getParameters())) {
	// 					const paramName = `${eventName}.${name}`;
	// 					paths.add(paramName);
	// 					await makeObjectPaths(paramName, schema, schemaRepository, paths);
	// 				}
	// 			}
	// 		}

	// 		setKirunStorePaths(paths);
	// 	})();
	// }, [storePaths, rawDef, functionRepository, schemaRepository]);

	const designerRef = useRef<HTMLDivElement>(null);
	const [menu, showMenu] = useState<any>(undefined);

	let overLine = undefined;
	if (dragDependencyTo) {
		const sx = dragDependencyNode.left / magnification;
		const sy = dragDependencyNode.top / magnification;
		const ex = dragDependencyTo.left / magnification;
		const ey = dragDependencyTo.top / magnification;

		let dPath = `M ${sx} ${sy} Q ${sx + (ex - sx) / 3} ${sy} ${sx + (ex - sx) / 2} ${
			sy + (ey - sy) / 2
		} T ${ex} ${ey}`;

		const stepName = dragDependencyNode.dependency?.split('.')?.[1];
		const fromColor = stepName
			? generateColor(rawDef.steps[stepName].namespace, rawDef.steps[stepName].name)
			: '000000';

		overLine = (
			<svg className="_linesSvg _overLine">
				<path
					key="line_drag_path"
					d={dPath}
					role="button"
					className="_connector _selected"
					stroke={'#' + fromColor}
				/>
			</svg>
		);
	}

	const searchBox = showAddSearch ? (
		<div className="_statement _forAdd" style={{ ...showAddSearch }}>
			<Search
				options={functionNames.map(e => ({
					value: e,
				}))}
				onChange={value => {
					if (isReadonly) return;

					const index = value.lastIndexOf('.');

					const name = index === -1 ? value : value.substring(index + 1);
					const namespace = index === -1 ? '_' : value.substring(0, index);

					const def = duplicate(rawDef);
					let sName = name.substring(0, 1).toLowerCase() + name.substring(1);

					if (!def.steps) def.steps = {};

					let i = '';
					let num = 0;
					while (def.steps[`${sName}${i}`]) i = `${++num}`;

					sName = `${sName}${i}`;
					def.steps[sName] = {
						statementName: sName,
						name,
						namespace,
						position: showAddSearch,
					};
					setShowAddSearch(undefined);
					setData(bindingPathPath, def, context.pageName);
				}}
				onClose={() => {
					setShowAddSearch(undefined);
				}}
			/>
		</div>
	) : (
		<></>
	);

	let paramEditor = <></>;

	if (editParameters && rawDef?.steps?.[editParameters]) {
		const s = rawDef.steps[editParameters];
		paramEditor = (
			<StatementParameters
				position={rawDef?.steps?.[editParameters].position ?? positions.get(editParameters)}
				statement={rawDef?.steps?.[editParameters]}
				functionRepository={functionRepository}
				schemaRepository={schemaRepository}
				storePaths={storePaths}
				onEditParametersClose={() => setEditParameters('')}
			>
				<StatementNode
					statement={s}
					position={s.position ?? positions.get(s.statementName)}
					key={s.statementName}
					functionRepository={functionRepository}
					schemaRepository={schemaRepository}
					tokenValueExtractors={tokenValueExtractors}
					selected={selectedStatements.has(s.statementName)}
					dragNode={dragNode}
					container={container}
					executionPlanMessage={kirunMessages.get(s.statementName)}
					onChange={stmt => {
						if (isReadonly) return;

						const def = duplicate(rawDef);
						delete def.steps[s.statementName];
						def.steps[stmt.statementName] = stmt;

						if (s.statementName === editParameters)
							setEditParameters(stmt.statementName);
						setData(bindingPathPath, def, context.pageName);
					}}
					functionNames={functionNames}
					onDelete={stmt => deleteStatements([stmt])}
					showComment={true}
					onEditParameters={name => setEditParameters(name)}
					editParameters={true}
					showParamValues={true}
					context={context}
					pageDefinition={pageDefinition}
					locationHistory={locationHistory}
					onRemoveAllDependencies={() => removeAllDependencies(s.statementName)}
				/>
			</StatementParameters>
		);
	}

	const [editFunction, setEditFunction] = useState<boolean>(false);

	let functionEditor = editFunction ? (
		<FunctionDetialsEditor
			functionKey={props.functionKey}
			rawDef={rawDef}
			onChange={(def: any) => {
				if (isReadonly) return;
				setData(bindingPathPath, def, context.pageName);
			}}
			onEditFunctionClose={() => setEditFunction(false)}
		/>
	) : (
		<></>
	);

	const editableIcons = isReadonly ? (
		<></>
	) : (
		<>
			<i
				className="fa fa-solid fa-square-plus"
				role="button"
				title="Add Step"
				onClick={() => {
					if (isReadonly) return;
					setShowAddSearch({ left: 20, top: 20 });
				}}
			/>
			<i
				className="fa fa-solid fa-trash"
				role="button"
				title="Delete selected Steps"
				onClick={() => {
					if (isReadonly || !selectedStatements.size || !rawDef.steps) return;

					const def = duplicate(rawDef);
					for (const [name] of Array.from(selectedStatements)) {
						delete def.steps[name];
					}

					setData(bindingPathPath, def, context.pageName);
				}}
			/>
			<div className="_separator" />
		</>
	);

	const editPencilIcon = isReadonly ? (
		<></>
	) : (
		<i
			className="fa fa-solid fa-pencil"
			role="button"
			title="Edit Function"
			onClick={() => setEditFunction(true)}
		/>
	);

	const resolvedStyles = processComponentStylePseudoClasses(
		props.pageDefinition,
		{},
		stylePropertiesWithPseudoStates,
	);

	let containerContents = <></>;

	if (!error) {
		containerContents = (
			<>
				<div
					className={`_designer ${scrMove.dragStart ? '_moving' : ''}`}
					style={{ transform: `scale(${magnification})` }}
					onMouseDown={designerMouseDown}
					onMouseMove={designerMouseMove}
					onMouseUp={designerMouseUp}
					onMouseLeave={designerMouseUp}
					onDoubleClick={ev => {
						ev.preventDefault();
						ev.stopPropagation();
						const parentRect = designerRef.current!.getBoundingClientRect();

						setShowAddSearch({
							left: (ev.clientX - parentRect.left - 5) / magnification,
							top: (ev.clientY - parentRect.top - 5) / magnification,
						});
					}}
					ref={designerRef}
					tabIndex={0}
					onKeyUp={ev => {
						if (ev.key === 'Delete' || ev.key === 'Backspace') {
							if (selectedStatements.size > 0)
								deleteStatements(Array.from(selectedStatements.keys()));
						} else if (
							(ev.key === 'a' || ev.key === 'A') &&
							(ev.ctrlKey || ev.metaKey)
						) {
							ev.stopPropagation();
							ev.preventDefault();
							const entries = Object.entries(rawDef.steps);

							setSelectedStatements(
								entries.length === selectedStatements.size
									? new Map()
									: new Map<string, boolean>(entries.map(([k, v]) => [k, true])),
							);
						} else if (ev.key === 'Escape') {
							setSelectedStatements(new Map());
						} else if (
							(ev.key === '+' || ev.key === '=' || ev.key === '-') &&
							(ev.ctrlKey || ev.metaKey)
						) {
							savePersonalization(
								'magnification',
								magnification + (ev.key === '-' ? -0.1 : 0.1),
							);
						}
					}}
					onContextMenu={ev => {
						ev.preventDefault();
						ev.stopPropagation();
						const parentRect = designerRef.current!.getBoundingClientRect();
						showMenu({
							position: {
								left: (ev.clientX - parentRect.left) / magnification,
								top: (ev.clientY - parentRect.top) / magnification,
							},
							type: 'designer',
							value: {},
						});
					}}
				>
					<ExecutionGraphLines
						executionPlan={executionPlan}
						designerRef={designerRef}
						rawDef={rawDef}
						selectedStatements={selectedStatements}
						menu={menu}
						setSelectedStatements={setSelectedStatements}
						functionRepository={functionRepository}
						showMenu={showMenu}
						stores={props.stores}
						showStores={!preference?.showStores}
						showParamValues={!preference?.showParamValues}
						hideArguments={props.hideArguments}
					/>
					{statements}
					{stores}
					{selector}
					<KIRunContextMenu
						menu={menu}
						showMenu={showMenu}
						isReadonly={isReadonly}
						rawDef={rawDef}
						bindingPathPath={bindingPathPath}
						pageName={context.pageName}
						setShowAddSearch={setShowAddSearch}
					/>
					{overLine}
					{searchBox}
				</div>
				{paramEditor}
				{functionEditor}
			</>
		);
	} else {
		containerContents = <div className="_error">{error?.message ?? error}</div>;
	}

	// Here it is an exception for the style properties, we add comp page editor when used standalone.
	return (
		<div
			className={`comp compKIRunEditor ${!props.functionKey ? 'compPageEditor' : ''}`}
			style={resolvedStyles?.comp ?? {}}
		>
			<HelperComponent context={props.context} definition={definition} />
			<div className="_header">
				<div className="_left">
					<i
						className="fa fa-solid fa-object-group"
						role="button"
						title="Select all"
						onClick={() => {
							const entries = Object.entries(rawDef.steps);

							setSelectedStatements(
								entries.length === selectedStatements.size
									? new Map()
									: new Map<string, boolean>(entries.map(([k, v]) => [k, true])),
							);
						}}
					/>
					<div className="_separator" />
					{editableIcons}
					<i
						className="fa fa-solid fa-square-root-variable"
						role="button"
						title={
							!preference?.showParamValues
								? 'Show Parameter Values'
								: 'Hide Parameter Values'
						}
						onClick={() => {
							savePersonalization('showParamValues', !preference?.showParamValues);
						}}
					/>
					<i
						className="fa fa-regular fa-comment-dots"
						role="button"
						title={preference?.showComments ? 'Show Comments' : 'Hide Comments'}
						onClick={() => {
							savePersonalization(
								'showComments',
								preference?.showComments === undefined
									? true
									: !preference.showComments,
							);
						}}
					/>
					<i
						className="fa fa-solid fa-database"
						role="button"
						title={preference?.showStores ? 'Show Stores' : 'Hide Stores'}
						onClick={() => {
							savePersonalization(
								'showStores',
								preference?.showStores === undefined
									? true
									: !preference.showStores,
							);
						}}
					/>
					<div className="_separator" />
					{editPencilIcon}
				</div>
				<div className="_right">
					<i
						className="fa fa-solid fa-magnifying-glass-plus"
						role="button"
						title="Zoom in"
						onClick={() => savePersonalization('magnification', magnification + 0.1)}
					/>
					<i
						className="fa fa-solid fa-magnifying-glass"
						role="button"
						title="Reset zoom"
						onClick={() => savePersonalization('magnification', 1)}
					/>
					<i
						className="fa fa-solid fa-magnifying-glass-minus"
						role="button"
						title="Zoom out"
						onClick={() => savePersonalization('magnification', magnification - 0.1)}
					/>
				</div>
			</div>
			<div className="_container" ref={container}>
				{containerContents}
			</div>
		</div>
	);
}

const component: Component = {
	name: 'KIRun Editor',
	displayName: 'KIRun Editor',
	description: 'KIRun Editor component',
	component: KIRunEditor,
	propertyValidation: (props: ComponentPropertyDefinition): Array<string> => [],
	properties: propertiesDefinition,
	styleComponent: KIRunEditorStyle,
	styleDefaults: styleDefaults,
	styleProperties: stylePropertiesDefinition,
	bindingPaths: {
		bindingPath: { name: 'Function Binding' },
		bindingPath2: { name: 'Personalization' },
	},
	subComponentDefinition: [
		{
			name: '',
			displayName: 'Component',
			description: 'Component',
			mainComponent: true,
			icon: (
				<IconHelper viewBox="0 0 30 30">
					<rect
						x="0.75"
						y="0.75"
						width="28.5"
						height="28.5"
						rx="3.25"
						fill="white"
						stroke="#667BC6"
						strokeWidth="1.5"
					/>
					<rect x="4" y="4" width="22" height="22" rx="1" fill="#EDEAEA" />
					<path
						d="M18 19.6718C18.6273 20.1481 19.9069 20.3995 21.1317 20.3995C22.3564 20.3995 23.6361 20.1481 24.2634 19.6718V20.6675C24.2634 21.1407 22.9241 21.67 21.1317 21.67C19.3393 21.67 18 21.1407 18 20.6675V19.6718ZM18 22.3325C18 22.8057 19.3393 23.335 21.1317 23.335C22.9241 23.335 24.2634 22.8057 24.2634 22.3325V21.3368C23.6361 21.813 22.3564 22.0645 21.1317 22.0645C19.9069 22.0645 18.6273 21.813 18 21.3368V22.3325ZM18 23.9975C18 24.4707 19.3393 25 21.1317 25C22.9241 25 24.2634 24.4707 24.2634 23.9975V23.0018C23.6361 23.4781 22.3564 23.7295 21.1317 23.7295C19.9069 23.7295 18.6273 23.4781 18 23.0018V23.9975ZM24.2634 19.0025C24.2634 18.5293 22.9241 18 21.1317 18C19.3393 18 18 18.5293 18 19.0025C18 19.4757 19.3393 20.005 21.1317 20.005C22.9241 20.005 24.2634 19.4757 24.2634 19.0025Z"
						fill="#667BC6"
					/>
					<path
						d="M5.875 5C5.39238 5 5 5.39238 5 5.875V6.75C5 7.23262 5.39238 7.625 5.875 7.625H11.125C11.6076 7.625 12 7.23262 12 6.75V5.875C12 5.39238 11.6076 5 11.125 5H5.875ZM9.70312 5.98438C9.79015 5.98438 9.87361 6.01895 9.93514 6.08048C9.99668 6.14202 10.0312 6.22548 10.0312 6.3125C10.0312 6.39952 9.99668 6.48298 9.93514 6.54452C9.87361 6.60605 9.79015 6.64062 9.70312 6.64062C9.6161 6.64062 9.53264 6.60605 9.47111 6.54452C9.40957 6.48298 9.375 6.39952 9.375 6.3125C9.375 6.22548 9.40957 6.14202 9.47111 6.08048C9.53264 6.01895 9.6161 5.98438 9.70312 5.98438ZM10.3594 6.3125C10.3594 6.22548 10.3939 6.14202 10.4555 6.08048C10.517 6.01895 10.6005 5.98438 10.6875 5.98438C10.7745 5.98438 10.858 6.01895 10.9195 6.08048C10.9811 6.14202 11.0156 6.22548 11.0156 6.3125C11.0156 6.39952 10.9811 6.48298 10.9195 6.54452C10.858 6.60605 10.7745 6.64062 10.6875 6.64062C10.6005 6.64062 10.517 6.60605 10.4555 6.54452C10.3939 6.48298 10.3594 6.39952 10.3594 6.3125ZM5.875 8.5C5.39238 8.5 5 8.89238 5 9.375V10.25C5 10.7326 5.39238 11.125 5.875 11.125H11.125C11.6076 11.125 12 10.7326 12 10.25V9.375C12 8.89238 11.6076 8.5 11.125 8.5H5.875ZM9.70312 9.48438C9.79015 9.48438 9.87361 9.51895 9.93514 9.58048C9.99668 9.64202 10.0312 9.72548 10.0312 9.8125C10.0312 9.89952 9.99668 9.98298 9.93514 10.0445C9.87361 10.1061 9.79015 10.1406 9.70312 10.1406C9.6161 10.1406 9.53264 10.1061 9.47111 10.0445C9.40957 9.98298 9.375 9.89952 9.375 9.8125C9.375 9.72548 9.40957 9.64202 9.47111 9.58048C9.53264 9.51895 9.6161 9.48438 9.70312 9.48438ZM10.4688 9.8125C10.4688 9.72548 10.5033 9.64202 10.5649 9.58048C10.6264 9.51895 10.7099 9.48438 10.7969 9.48438C10.8839 9.48438 10.9674 9.51895 11.0289 9.58048C11.0904 9.64202 11.125 9.72548 11.125 9.8125C11.125 9.89952 11.0904 9.98298 11.0289 10.0445C10.9674 10.1061 10.8839 10.1406 10.7969 10.1406C10.7099 10.1406 10.6264 10.1061 10.5649 10.0445C10.5033 9.98298 10.4688 9.89952 10.4688 9.8125Z"
						fill="#667BC6"
					/>
					<path
						d="M12 8H13.4C13.9523 8 14.4 8.44772 14.4 9V21C14.4 21.5523 14.8477 22 15.4 22H18"
						stroke="black"
						strokeOpacity="0.1"
						strokeWidth="0.5"
						strokeDasharray="1 1"
						fillOpacity={0}
					/>
				</IconHelper>
			),
		},
	],
};

export default component;
