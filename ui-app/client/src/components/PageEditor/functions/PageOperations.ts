import React from 'react';
import { isNullValue, LinkedList } from '@fincity/kirun-js';

import { getDataFromPath, PageStoreExtractor, setData } from '../../../context/StoreContext';
import { ComponentDefinition, LocationHistory, PageDefinition } from '../../../types/common';
import duplicate from '../../../util/duplicate';
import { Issue } from '../components/IssuePopup';
import { COPY_CD_KEY, CUT_CD_KEY, DRAG_CD_KEY, DRAG_COMP_NAME } from '../../../constants';
import ComponentDefinitions from '../../';
import Grid from '../../Grid/Grid';
import { shortUUID } from '../../../util/shortUUID';

interface ClipboardObject {
	mainKey: string;
	objects: { [key: string]: ComponentDefinition };
}

export default class PageOperations {
	private defPath: string | undefined;
	private locationHistory: Array<LocationHistory>;
	private pageExtractor: PageStoreExtractor;
	private setIssue: React.Dispatch<Issue>;
	private selectedComponent: string | undefined;
	private onSelectedComponentChanged: (key: string) => void;

	constructor(
		defPath: string | undefined,
		locationHistory: Array<LocationHistory>,
		pageExtractor: PageStoreExtractor,
		setIssue: React.Dispatch<Issue>,
		selectedComponent: string | undefined,
		onSelectedComponentChanged: (key: string) => void,
	) {
		this.defPath = defPath;
		this.locationHistory = locationHistory;
		this.pageExtractor = pageExtractor;
		this.setIssue = setIssue;
		this.selectedComponent = selectedComponent;
		this.onSelectedComponentChanged = onSelectedComponentChanged;
	}

	public deleteComponent(compkey: string | undefined) {
		if (!compkey || !this.defPath) return;

		const pageDef: PageDefinition = getDataFromPath(
			this.defPath,
			this.locationHistory,
			this.pageExtractor,
		);
		if (!pageDef) return;

		if (pageDef.rootComponent === compkey) {
			// When a root component is delete we need to add a new grid so people can add components to it.
			// It requires a confirmation if we can delete a grid that is root.
			this.setIssue({
				message:
					'Deleting the root component will delete the entire screen. Do you want to delete?',
				defaultOption: 'No',
				options: ['Yes', 'No'],
				callbackOnOption: {
					Yes: () => {
						if (!this.defPath) return;
						let def: PageDefinition = getDataFromPath(
							this.defPath,
							this.locationHistory,
							this.pageExtractor,
						);
						const key = this.genId();
						def = {
							...def,
							rootComponent: key,
							componentDefinition: {
								[key]: { key, name: 'Page Grid', type: 'Grid' },
							},
						};
						this.onSelectedComponentChanged('');
						setData(this.defPath, def, this.pageExtractor.getPageName());
					},
				},
			});
		} else {
			let def = {
				...pageDef,
				componentDefinition: { ...(pageDef.componentDefinition ?? {}) },
			};
			// Delete the component that is selected or delete triggered on.
			delete def.componentDefinition[compkey];
			// Finding the parent component of the deleting component and removing it from its children.
			let keys = Object.values(def.componentDefinition)
				.filter(e => e.children?.[compkey])
				.map(e => e.key);
			for (let i = 0; i < keys.length; i++) {
				const x = duplicate(def.componentDefinition[keys[i]]);
				delete x.children[compkey];
				def.componentDefinition[x.key] = x;
			}
			if (this.selectedComponent === compkey) this.onSelectedComponentChanged('');
			setData(this.defPath, def, this.pageExtractor.getPageName());
		}
	}

	public wrapGrid(compkey: string | undefined) {
		if (!compkey || !this.defPath) return;

		const pageDef: PageDefinition = getDataFromPath(
			this.defPath,
			this.locationHistory,
			this.pageExtractor,
		);
		if (!pageDef) return;

		const key = this.genId();
		let def = duplicate(pageDef) as PageDefinition;

		if (pageDef.rootComponent === compkey) {
			if (!def.componentDefinition) def.componentDefinition = {};
			if (!def.rootComponent) {
				def.rootComponent = key;
				def.componentDefinition[key] = {
					...(Grid.defaultTemplate ?? { name: 'Grid', type: 'Grid' }),
					key,
				};
			} else {
				def.componentDefinition[key] = {
					...(Grid.defaultTemplate ?? { name: 'Grid', type: 'Grid' }),
					key,
					children: { [def.rootComponent]: true },
				};
			}
		} else {
			let keys = Object.values(def.componentDefinition)
				.filter(e => e.children?.[compkey])
				.map(e => e.key);
			for (let i = 0; i < keys.length; i++) {
				const x = def.componentDefinition[keys[i]] as ComponentDefinition;
				delete x!.children![compkey];
				x!.children![key] = true;
			}
			def.componentDefinition[key] = {
				...(Grid.defaultTemplate ?? { name: 'Grid', type: 'Grid' }),
				key,
				displayOrder: def.componentDefinition[compkey].displayOrder,
				children: { [compkey]: true },
			};
			def.componentDefinition[compkey].displayOrder = 0;
		}

		this.onSelectedComponentChanged(key);
		setData(this.defPath, def, this.pageExtractor.getPageName());
	}

	public droppedOn(componentKey: string, droppedData: any, forceSameParent: boolean = false) {
		let pageDef: PageDefinition = getDataFromPath(
			this.defPath,
			this.locationHistory,
			this.pageExtractor,
		);
		if (!pageDef) return;
		pageDef = duplicate(pageDef);
		if (!pageDef.componentDefinition) pageDef.componentDefinition = {};

		if (droppedData.startsWith(DRAG_CD_KEY)) {
			// When a component is dragged on to another in the same page.
			const mainKey = droppedData.substring(DRAG_CD_KEY.length);
			if (mainKey === componentKey || !this.defPath) return;

			const obj = pageDef.componentDefinition[mainKey];
			if (!obj) return;

			// Finding the parent of the dropped component.
			const sourceParent = Object.values(pageDef.componentDefinition).find(
				e => e.children?.[mainKey],
			);

			// Force same parent is used to force the sorting in the bottom bar when the parent of
			// dropped component and dropped on component.
			if (forceSameParent && sourceParent?.children?.[componentKey]) {
				// Finding the order of children keys and sorting them before adding the droppped
				// key and it's order
				let childrenOrder = Object.keys(sourceParent.children ?? {})
					.map(e => pageDef.componentDefinition[e])
					.map(e => ({ key: e.key, displayOrder: e.displayOrder }))
					.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
				// Figuring out the current positions of the dropped on and dropped components.
				let doPosition = -1;
				let dpPosition = -1;
				for (let i = 0; i < childrenOrder.length; i++) {
					if (childrenOrder[i].key === componentKey) doPosition = i;
					else if (childrenOrder[i].key === mainKey) dpPosition = i;
				}

				// Removing the component from the order
				let x = childrenOrder.splice(dpPosition, 1);

				// If the dropped component is coming from below the dropped on component
				if (doPosition < dpPosition) doPosition--;
				if (doPosition < 0) doPosition = 0;

				// Adding it back into order in the right position
				childrenOrder.splice(doPosition, 0, ...x);

				// Generating the right displayOrder starting fromn 0
				childrenOrder.forEach(
					({ key }, i) => (pageDef.componentDefinition[key].displayOrder = i + 1),
				);

				// Then saving back to the store.
				setData(this.defPath, pageDef, this.pageExtractor.getPageName());

				return;
			}

			// If it is otherwise, not of same parent and no forcing same parent.
			// Remove the object from the definition and remove from it's parent's children too.
			delete pageDef.componentDefinition[mainKey];
			if (sourceParent) {
				delete sourceParent.children?.[mainKey];
			}

			// Call the drop on internal function to finish the job.
			this._dropOn(
				pageDef,
				componentKey,
				mainKey,
				{ [mainKey]: obj },
				sourceParent?.key,
				obj.displayOrder,
			);
		} else if (droppedData.startsWith(DRAG_COMP_NAME)) {
			// If a component from the side bar is dragged.

			const compName = droppedData.substring(DRAG_COMP_NAME.length);
			const key = this.genId();

			const obj = ComponentDefinitions.get(compName)?.defaultTemplate
				? duplicate(ComponentDefinitions.get(compName)?.defaultTemplate)
				: { name: compName, type: compName };
			obj.key = key;

			// Created the definition from the default template or create one with just the name and key.
			this._dropOn(pageDef, componentKey, key, { [key]: obj });
			this.onSelectedComponentChanged(key);
		}
	}

	public copy(componentKey: any) {
		if (!ClipboardItem || !this.defPath || !componentKey) return;

		let def: PageDefinition = getDataFromPath(
			this.defPath,
			this.locationHistory,
			this.pageExtractor,
		);

		const pageDef: PageDefinition = duplicate(def);
		// Prepare the copy object and write to the clipboard.
		const cutObject: ClipboardObject = this._makeCutOrCopyObject(
			pageDef,
			componentKey,
			true,
			false,
		);

		navigator.clipboard.write([
			new ClipboardItem({
				'text/plain': new Blob([COPY_CD_KEY + JSON.stringify(cutObject)], {
					type: 'text/plain',
				}),
			}),
		]);
	}

	public cut(componentKey: any) {
		if (!ClipboardItem || !this.defPath || !componentKey) return;

		let def: PageDefinition = getDataFromPath(
			this.defPath,
			this.locationHistory,
			this.pageExtractor,
		);
		if (!def) return;

		if (componentKey === def.rootComponent) {
			// If the root component is the one that get's cut, similar to delete we need a new
			// root component to hold the components which requires a confirmation.
			this.setIssue({
				message:
					'Cutting the root component will delete the entire screen. Do you want to cut?',
				defaultOption: 'No',
				options: ['Yes', 'No'],
				callbackOnOption: {
					Yes: () => {
						if (!this.defPath) return;
						let def: PageDefinition = getDataFromPath(
							this.defPath,
							this.locationHistory,
							this.pageExtractor,
						);
						def = duplicate(def);
						// Here making the copy of the object to move it to clipboard.
						const cutObject: {
							mainKey: string;
							objects: { [key: string]: ComponentDefinition };
						} = this._makeCutOrCopyObject(def, componentKey, true);

						const key = this.genId();
						// Similar to delete we created a new root component.
						def.rootComponent = key;
						def.componentDefinition[key] = { key, name: 'Page Grid', type: 'Grid' };

						// Also, if something is selected remove it from the selection.
						this.onSelectedComponentChanged('');
						setData(this.defPath, def, this.pageExtractor.getPageName());

						// Copy to clipboard.
						navigator.clipboard.write([
							new ClipboardItem({
								'text/plain': new Blob([CUT_CD_KEY + JSON.stringify(cutObject)], {
									type: 'text/plain',
								}),
							}),
						]);
					},
				},
			});
			return;
		}

		const pageDef: PageDefinition = duplicate(def);
		// Just prepare the Clipboard object and no more fuss if it is not root component.
		const cutObject: ClipboardObject = this._makeCutOrCopyObject(pageDef, componentKey, true);

		setData(this.defPath, pageDef, this.pageExtractor.getPageName());

		// Set the clipboard
		navigator.clipboard.write([
			new ClipboardItem({
				'text/plain': new Blob([CUT_CD_KEY + JSON.stringify(cutObject)], {
					type: 'text/plain',
				}),
			}),
		]);
	}

	private _makeCutOrCopyObject(
		pageDef: PageDefinition,
		componentKey: any,
		deleteExisting: boolean = false,
		deselect: boolean = true,
	) {
		const obj = pageDef.componentDefinition[componentKey];
		const cutObject: ClipboardObject = {
			mainKey: obj.key,
			objects: {},
		};

		// Adding the first object to the que to traverse the children tree.
		// Delete existing is for cut. If this fuction is called from a cut function.
		const que = new LinkedList<ComponentDefinition>();
		que.add(obj);
		const keySet = new Set<string>();
		if (deleteExisting) delete pageDef.componentDefinition[componentKey];
		while (que.size() > 0) {
			const x = que.pop();
			cutObject.objects[x.key] = x;
			keySet.add(x.key);

			if (!x.children) continue;
			Object.keys(x.children).forEach(k => {
				const e = pageDef.componentDefinition[k];
				que.add(e);
				if (deleteExisting) delete pageDef.componentDefinition[k];
			});
		}

		// If we delete the component which is part of the tree and is selected then we remove the selection.
		if (
			deselect &&
			deleteExisting &&
			this.selectedComponent &&
			keySet.has(this.selectedComponent)
		)
			this.onSelectedComponentChanged('');
		return cutObject;
	}

	public paste(componentKey: any) {
		if (!ClipboardItem || !this.defPath || !componentKey) return;

		navigator.clipboard.readText().then(data => {
			let pageDef: PageDefinition = getDataFromPath(
				this.defPath,
				this.locationHistory,
				this.pageExtractor,
			);
			if (!pageDef) return;
			pageDef = duplicate(pageDef);
			if (!pageDef.componentDefinition) pageDef.componentDefinition = {};

			// This function called on pasting the component.
			let clipObj: ClipboardObject | undefined;
			try {
				if (data.startsWith(CUT_CD_KEY)) {
					clipObj = JSON.parse(data.substring(CUT_CD_KEY.length));
				} else if (data.startsWith(COPY_CD_KEY)) {
					clipObj = JSON.parse(data.substring(COPY_CD_KEY.length));
				}
			} catch (err) {}

			if (!clipObj) return;

			// Since we can paste from copy, the keys will already there in the definition.
			// We need to change keys. If we cut there won't these keys and can continue with pasting.
			// If we paste twice from a cut, there will be already there in the definition.
			if (this._hasAtleastOneKey(pageDef, clipObj)) {
				clipObj = this._changeKeys(clipObj);
			}

			// Once the clipboard object is sorted and keys are changed if required we move ahead with
			// pasting / dropping.
			this._dropOn(pageDef, componentKey, clipObj.mainKey, clipObj.objects);
		});
	}

	private _changeKeys(clipObj: ClipboardObject): ClipboardObject {
		const newObj: ClipboardObject = { mainKey: '', objects: {} };
		const index: { [key: string]: string } = {};

		// All the objects will get new keys and set in the newObj.objects.
		// Also added index with the old key to new key.
		for (const obj of Object.values(clipObj.objects)) {
			const x = duplicate(obj);
			const newKey = this.genId();
			index[x.key] = newKey;
			x.key = newKey;
			newObj.objects[newKey] = x;
		}

		// Change the main key from the set of the new keys generated.
		newObj.mainKey = index[clipObj.mainKey];

		// Reset all children keys from the index that is generated earlier.
		Object.values(newObj.objects).forEach(e => {
			if (!e.children) return;
			e.children = Object.entries(e.children)
				.map(x => ({ key: index[x[0]], value: x[1] }))
				.reduce((a, c) => {
					a[c.key] = c.value;
					return a;
				}, {} as { [key: string]: boolean });
		});

		return newObj;
	}

	private _hasAtleastOneKey(pageDef: PageDefinition, clipObj: ClipboardObject): boolean {
		// This function checks if the clipboard object keys are already part of the definition.
		if (pageDef.componentDefinition[clipObj.mainKey]) return true;

		// Checking each key in the clipboard object.
		for (let str of Object.keys(clipObj)) if (pageDef.componentDefinition[str]) return true;
		return false;
	}

	private _dropOn(
		pageDef: PageDefinition,
		onKey: string,
		mainKey: string,
		comps: { [key: string]: ComponentDefinition },
		sourceParent?: string,
		sourceDisplayOrder?: number,
	) {
		//Dropped On component
		let doComp: ComponentDefinition | undefined = pageDef.componentDefinition[onKey];
		//Dropping component
		const dpComp: ComponentDefinition | undefined = comps[mainKey];

		let doCompComponent = ComponentDefinitions.get(doComp.type);
		const dpCompComponent = ComponentDefinitions.get(dpComp.type);

		// Check if the the component being dropped and dropped are in the valid format.
		if (!doComp || !dpComp) {
			this.setIssue({
				message: 'Error in finding the right component to paste/drop',
				options: ['Ok'],
				defaultOption: 'Ok',
			});
			return;
		}

		// Checking if the component defintion of component is valid.
		if (!doCompComponent || !dpCompComponent) {
			this.setIssue({
				message: 'Wrong component type is pasted/dropped',
				options: ['Ok'],
				defaultOption: 'Ok',
			});
			return;
		}

		let droppedOnPosition = -1;
		let sameParent = false;

		if (!doCompComponent.allowedChildrenType) {
			// If the component that is being dropped on is not a component which can have children.
			droppedOnPosition = doComp.displayOrder ?? -1;
			// Finding the parent of the droppped on component so the dropped component can
			// be part of the same component.
			doComp = Object.values(pageDef.componentDefinition).find(e => e.children?.[onKey]);

			// If the parent is not found or the component definition of the parent type is not found.
			if (!doComp || !ComponentDefinitions.get(doComp.type)) {
				this.setIssue({
					message: 'Error in finding the right component to paste/drop',
					options: ['Ok'],
					defaultOption: 'Ok',
				});
				return;
			}

			// See if the dropped or dropped on component are from the same parent.
			sameParent = doComp.key === sourceParent;
		}

		doCompComponent = ComponentDefinitions.get(doComp!.type);

		if (doCompComponent?.allowedChildrenType) {
			if (!doComp.children) doComp.children = {};

			let allowedChildCount = doCompComponent.allowedChildrenType.get('');
			let isGenericChild = true;

			if (isNullValue(allowedChildCount)) {
				// If the the component type don't allow all children
				allowedChildCount = doCompComponent.allowedChildrenType.get(doComp.type);
				isGenericChild = false;
			}

			if (isNullValue(allowedChildCount)) {
				// If it cannot contain the type of the child dropped show the message what
				// are the valid children.
				this.setIssue({
					message: `${doCompComponent.displayName} cannot contain ${
						dpCompComponent.displayName
					}. It can contain only ${Array.from(doCompComponent.allowedChildrenType.keys())
						.map(e => ComponentDefinitions.get(e)?.displayName!)
						.reduce((a: string, c: string, i, arr) => {
							if (i + 2 === arr.length) return a + c + ' or ';
							else if (i + 1 === arr.length) return a + c;
							else return a + c + ', ';
						}, '')}.`,
					defaultOption: 'Ok',
					options: ['Ok'],
				});

				return;
			}

			if (dpCompComponent.parentType && doCompComponent.name !== dpCompComponent.parentType) {
				// If there is a parent restriction like the allowed children. We have to
				// show it is not allowed.
				this.setIssue({
					message: `${dpCompComponent.displayName} cannot be part of ${
						doCompComponent.displayName
					}. It can be part of only ${
						ComponentDefinitions.get(dpCompComponent.parentType)?.displayName
					}`,
					defaultOption: 'Ok',
					options: ['Ok'],
				});

				return;
			}

			if (allowedChildCount !== -1) {
				// Counting the number of children if there is a restriction.
				let count = isGenericChild
					? Object.keys(doComp.children).length
					: Object.keys(doComp.children).filter(
							e => pageDef.componentDefinition[e].type === dpComp.type,
					  ).length;
				if (count >= allowedChildCount!) {
					// If there is a count restriction we need a confirmation to replace the existing ones.
					this.setIssue({
						message: `${doCompComponent.displayName} allows ${allowedChildCount} ${
							isGenericChild ? '' : `of type ${dpCompComponent.displayName} as`
						} children. Do you want to replace the existing components?`,
						defaultOption: 'No',
						options: ['Yes', 'No'],
						callbackOnOption: {
							Yes: () => {
								if (!doComp || !doComp.key) return;

								const inPgDef: PageDefinition = duplicate(
									getDataFromPath(
										this.defPath,
										this.locationHistory,
										this.pageExtractor,
									),
								);
								// Clean children and add the new ones.
								let removeChildren = isGenericChild
									? Object.keys(doComp.children ?? {})
									: Object.keys(doComp.children ?? {}).filter(
											e =>
												dpComp.type === inPgDef.componentDefinition[e].type,
									  );

								removeChildren.forEach(e => {
									delete inPgDef.componentDefinition[e];
									delete inPgDef.componentDefinition[doComp!.key]?.children?.[e];
								});

								this._updateDisplayOrder(
									inPgDef.componentDefinition[doComp.key],
									inPgDef,
									droppedOnPosition,
									comps[dpComp.key],
									comps,
									sameParent ? sourceDisplayOrder : undefined,
								);
								setData(this.defPath!, inPgDef, this.pageExtractor.getPageName());
							},
						},
					});
					return;
				}
			}

			this._updateDisplayOrder(
				doComp,
				pageDef,
				droppedOnPosition,
				dpComp,
				comps,
				sameParent ? sourceDisplayOrder : undefined,
			);
		} else {
			//If for some reason the dropped on component cannot have children.
			this.setIssue({
				message: `Cannot paste/drop ${dpCompComponent.displayName} on ${doCompComponent?.displayName}.`,
				options: ['Ok'],
				defaultOption: 'Ok',
			});
			return;
		}

		setData(this.defPath!, pageDef, this.pageExtractor.getPageName());
	}

	private _updateDisplayOrder(
		doComp: ComponentDefinition,
		pageDef: PageDefinition,
		droppedOnPosition: number,
		dpComp: ComponentDefinition,
		comps: { [key: string]: ComponentDefinition },
		droppedCompPosition?: number,
	) {
		// Creating the children order to update the new order.
		let childrenOrder = Object.keys(doComp.children ?? {})
			.map(e => pageDef.componentDefinition[e])
			.map(e => ({ key: e.key, displayOrder: e.displayOrder }))
			.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

		if (droppedOnPosition === -1 || !childrenOrder.length) {
			// If the droppedOnPosition is -1 i.e. when dropped on a parent but not a
			// non child type. We have to add the component to the end of the list.
			dpComp.displayOrder = childrenOrder.length
				? Math.max(...childrenOrder.map(e => e.displayOrder ?? 0)) + 1
				: 0;
		} else {
			// To put the droppedComponent in the right position we need to find it's
			// positon and add it just above or below the droppedOnComponent.
			// If the dropped component is from below, it is added above the dropped on component
			// and vice versa.
			let ind = childrenOrder.findIndex(e => e.displayOrder === droppedOnPosition);
			if (ind === -1) {
				childrenOrder.push({ key: dpComp.key, displayOrder: dpComp.displayOrder });
			} else {
				if (droppedOnPosition !== -1 && !isNullValue(droppedCompPosition)) {
					if (droppedOnPosition > droppedCompPosition!) ind++;
					if (ind < 0) ind = 0;
				}
				childrenOrder.splice(ind, 0, {
					key: dpComp.key,
					displayOrder: dpComp.displayOrder,
				});
			}
		}
		if (!doComp.children) doComp.children = {};
		doComp.children[dpComp.key] = true;
		pageDef.componentDefinition = { ...pageDef.componentDefinition, ...comps };

		// The new set of children will have the new order staring from 1
		childrenOrder.forEach(
			({ key }, i) => (pageDef.componentDefinition[key].displayOrder = i + 1),
		);
	}

	public genId(): string {
		return shortUUID();
	}
}
