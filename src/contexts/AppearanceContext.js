import React, { createContext } from 'react';

export const AppearanceContext = createContext();
const AppearanceContextProvider = (props) => {
	const appearance = {
		cardTitle: 'h5',
		textField: 'sm',
		button: 'sm',
		notSet: <i style={{ color: '#5d5d5d' }}>Not Set</i>,
	};
	console.log('**** AppearanceContext ****');
	return (
		<AppearanceContext.Provider value={{ appearance }}>{props.children}</AppearanceContext.Provider>
	);
};

export default AppearanceContextProvider;
