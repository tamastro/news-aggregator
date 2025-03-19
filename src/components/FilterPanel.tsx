// src/components/FilterPanel.tsx
import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';

const FilterPanel: React.FC = () => {
	const { preferences, setPreferences } = usePreferences();

	const handleSourceChange = (source: string) => {
		setPreferences((prev) => ({
			...prev,
			sources: prev.sources.includes(source)
				? prev.sources.filter((s) => s !== source)
				: [...prev.sources, source],
		}));
	};

	return (
		<div>
			<h3>Filter by Source</h3>
			<label>
				<input
					type='checkbox'
					onChange={() => handleSourceChange('source1')}
				/>{' '}
				Source 1
			</label>
			<label>
				<input
					type='checkbox'
					onChange={() => handleSourceChange('source2')}
				/>{' '}
				Source 2
			</label>
			{/* Add more sources, categories, and authors as needed */}
		</div>
	);
};

export default FilterPanel;
