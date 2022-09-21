import React from 'react';
import { getData } from '../context/StoreContext';
export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	definition: {
		properties: {
			label: {
				value: string;
				location: {
					type: 'EXPRESSION' | 'VALUE';
					value?: string;
					expression?: string;
				};
			};
		};
	};
}
export function Button(props: ButtonProps) {
	const {
		definition: {
			properties: { label },
		},
		...rest
	} = props;
	const buttonLabel = getData(label);
	return <button {...rest}>{buttonLabel}</button>;
}
