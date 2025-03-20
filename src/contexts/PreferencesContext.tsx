import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Preferences {
	source: string;
	category: string;
	author: string;
}

const PreferencesContext = createContext<{
	preferences: Preferences;
	setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
} | null>(null);

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

export const usePreferences = () => {
	const context = useContext(PreferencesContext);
	if (!context) {
		throw new Error('usePreferences must be used within a PreferencesProvider');
	}
	return context;
};
