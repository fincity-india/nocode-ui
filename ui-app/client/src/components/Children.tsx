import React from 'react';
import { DataLocation, RenderContext } from '../types/common';
import {
	addListener,
	getData,
	getDataFromPath,
	localStoreExtractor,
	PageStoreExtractor,
	storeExtractor,
} from '../context/StoreContext';
import { useLocation } from 'react-router-dom';
import { processLocation } from '../Engine/RenderEngineContainer';
import { STORE_PREFIX } from '../constants';
import { Components } from './index';
import Page from './Page';
import Nothing from './Nothing';
import { TokenValueExtractor } from '@fincity/kirun-js';
import { getPathsFrom } from './util/getPaths';

const getPageDefinition = (location: any) => {
	let { pageName } = processLocation(location);
	if (!pageName)
		pageName = getDataFromPath(`${STORE_PREFIX}.application.properties.defaultPage`, []);
	let pDef = getDataFromPath(`${STORE_PREFIX}.pageDefinition.${pageName}`, []);
	return pDef;
};

function Children({
	pageDefinition,
	children,
	context,
	locationHistory,
}: {
	pageDefinition: any;
	children: any;
	context: RenderContext;
	locationHistory: Array<DataLocation | string>;
}) {
	const [visibilityPaths, setVisibilityPaths] = React.useState(Date.now());
	const location = useLocation();
	const pageExtractor = PageStoreExtractor.getForContext(context.pageName);
	const evaluatorMaps = new Map<string, TokenValueExtractor>([
		[storeExtractor.getPrefix(), storeExtractor],
		[localStoreExtractor.getPrefix(), localStoreExtractor],
		[pageExtractor.getPrefix(), pageExtractor],
	]);

	React.useEffect(() => {
		let set = Object.entries(children)
			.filter(([, v]) => !!v)
			.map(([k]) => pageDefinition.componentDefinition[k])
			.filter(e => !!e?.properties?.visibility)
			.map(e => getPathsFrom(e.properties.visibility, evaluatorMaps))
			.reduce((a, c) => {
				for (let str of c) a.add(str);
				return a;
			}, new Set<string>());

		if (set.size == 0) return undefined;
		return addListener(() => setVisibilityPaths(Date.now()), pageExtractor, ...set);
	}, []);

	return (
		<>
			{Object.entries(children)
				.filter(([, v]) => !!v)
				.map(([k]) => pageDefinition.componentDefinition[k])
				.map(e => {
					if (!e?.properties?.visibility) return e;

					return !!getData(e?.properties?.visibility, locationHistory, pageExtractor)
						? e
						: undefined;
				})
				.filter(e => !!e)
				.sort((a: any, b: any) => (a?.displayOrder || 0) - (b?.displayOrder || 0))
				.map(e => {
					let comp = Components.get(e.type);
					if (!comp && e.type === 'Page') {
						const pageDef = React.useMemo(
							() => getPageDefinition(location),
							[location],
						);
						if (pageDef)
							return React.createElement(Page, {
								definition: pageDef,
								key: pageDef.key,
								context: { pageName: pageDef.name },
								locationHistory: [],
							});
					}
					if (!comp) comp = Nothing;
					if (!comp) return undefined;
					return React.createElement(comp, {
						definition: e,
						key: e.key,
						pageDefinition: pageDefinition,
						context,
						locationHistory: locationHistory,
					});
				})
				.filter(e => !!e)}
		</>
	);
}

export default Children;
