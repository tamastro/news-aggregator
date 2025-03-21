import { createContext } from 'react';
import { Preferences } from './PreferencesProvider'; // Adjust the import path as necessary

export const PreferencesContext = createContext<{
	preferences: Preferences;
	setPreferences: React.Dispatch<React.SetStateAction<Preferences>>;
} | null>(null);
