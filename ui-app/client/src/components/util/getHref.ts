import { Location as ReactLocation, useLocation } from 'react-router-dom';
import { processLocation } from '../../util/locationProcessor';

export function getHref(linkPath: string = '', location: ReactLocation | Location) {
	// {pathname: '/page/dashboard', search: '', hash: '', state: null, key: 'default'}
	const processedLocation = processLocation(location);
	let prefix: string = '';
	let midfix: string = '';
	let url: string = '';
	if (
		linkPath?.startsWith('http:') ||
		linkPath?.startsWith('https:') ||
		linkPath?.startsWith('//') ||
		linkPath?.startsWith('www') ||
		linkPath?.startsWith('mailto:') ||
		linkPath?.startsWith('tel:') ||
		linkPath?.startsWith('#')
	) {
		return linkPath;
	}

	if (location.pathname.includes('/page')) {
		const appCode = processedLocation.appName ? '/' + processedLocation.appName : '';
		const clientCode = processedLocation.clientCode ? '/' + processedLocation.clientCode : '';
		prefix = appCode + clientCode;
	}

	if (linkPath?.startsWith('/')) {
		if (linkPath?.startsWith('/api/')) {
			url = prefix + '' + linkPath;
		} else {
			if (location.pathname.includes('/page/')) {
				url = prefix + '/page' + linkPath;
			} else {
				url = linkPath;
			}
		}
	} else {
		let length = '/page/'.length;
		midfix = location.pathname.substring(
			location.pathname.indexOf('/page/') + length,
			location.pathname.length,
		);
		if (midfix !== '' && !midfix.endsWith('/')) {
			midfix += '/';
		}

		if (linkPath?.startsWith('api')) {
			if (location.pathname.includes('/page/')) {
				url = prefix + '/' + midfix + linkPath;
			} else {
				url = linkPath;
			}
		} else {
			if (location.pathname.includes('/page/')) {
				url = prefix + '/page/' + midfix + linkPath;
			} else {
				url = linkPath;
			}
		}
	}

	return url;
}
