import React, { useState, ReactNode } from 'react';
import { PreferencesContext } from './PreferencesContext'; // Adjust the import path as necessary

export interface Preferences {
	source: string;
	category: string;
	author: string;
}

export const PreferencesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [preferences, setPreferences] = useState<Preferences>({
		source: 'newsApi',
		category: 'general',
		author: '',
	});

	return (
		<PreferencesContext.Provider value={{ preferences, setPreferences }}>
			{children}
		</PreferencesContext.Provider>
	);
};
