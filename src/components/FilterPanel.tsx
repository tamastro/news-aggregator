import React from 'react';
import { usePreferences } from '../contexts/PreferencesContext';

type FilterPanelProps = {
	onFilterChange: (newSource: string) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
	const handleSourceChange = (source: string) => {
		onFilterChange(source);
	};

	return (
		<div>
			<label>
				<select onChange={(e) => handleSourceChange(e.target.value)}>
					<option value='newsApi'>news API</option>
					<option value='guardian'>The Guardian</option>
					<option value='source3'>Source 3</option>
				</select>
			</label>
			{/* Add more sources, categories, and authors as needed */}
		</div>
	);
};

export default FilterPanel;
