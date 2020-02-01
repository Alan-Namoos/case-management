import React, { createContext } from 'react';

export const AppearanceContext = createContext();
const AppearanceContextProvider = (props) => {
	const size = {
		cardTitle: 'h5',
		textField: 'sm',
		button: 'sm'
	};
	return <AppearanceContext.Provider value={{ size }}>{props.children}</AppearanceContext.Provider>;
};

export default AppearanceContextProvider;
