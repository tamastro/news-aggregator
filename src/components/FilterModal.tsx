import React, { useState } from 'react';
import Modal from 'react-modal';
import { camelCaseToTitleCase } from '../helper/camelCaseToString';
import { usePreferences } from '../contexts/PreferencesContext';

interface FilterModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
	isOpen,
	onRequestClose,
}) => {
	const { preferences, setPreferences } = usePreferences();
	const [selectedSource, setSelectedSource] = useState<string | null>(
		preferences.sources[0] || null,
	);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		preferences.categories[0] || null,
	);

	const handleSourceChange = (source: string) => {
		setSelectedSource(source);
		setPreferences({ ...preferences, sources: [source] }); // Update preferences with a single source
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setPreferences({ ...preferences, categories: [category] }); // Update preferences with a single category
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className='preferences-modal'
			overlayClassName='modal-overlay'
		>
			<h2>Filter Preferences</h2>
			<div>
				<h3>Sources</h3>
				<select
					value={selectedSource || ''}
					onChange={(e) => handleSourceChange(e.target.value)}
				>
					{['newsApi', 'guardian', 'newYorkTimes'].map((source) => (
						<option
							key={source}
							value={source}
						>
							{camelCaseToTitleCase(source)}
						</option>
					))}
				</select>
			</div>
			<div>
				<h3>Categories</h3>
				<select
					value={selectedCategory || ''}
					onChange={(e) => handleCategoryChange(e.target.value)}
				>
					{[
						'general',
						'economy',
						'politics',
						'business',
						'technology',
						'health',
						'science',
						'sports',
						'entertainment',
						'environment',
					].map((category) => (
						<option
							key={category}
							value={category}
						>
							{camelCaseToTitleCase(category)}
						</option>
					))}
				</select>
			</div>
			<button onClick={onRequestClose}>Close</button>
		</Modal>
	);
};

export default FilterModal;
