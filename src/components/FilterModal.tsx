import React, { useState } from 'react';
import Modal from 'react-modal';
import { camelCaseToTitleCase } from '../helper/camelCaseToString';
import { usePreferences } from '../hooks/usePreferences';

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
		preferences.source || null,
	);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		preferences.category || null,
	);
	const [selectedAuthor, setSelectedAuthor] = useState<string | null>(
		preferences.author || null,
	);

	const handleSourceChange = (source: string) => {
		setSelectedSource(source);
		setPreferences({ ...preferences, source: source });
	};

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setPreferences({ ...preferences, category: category });
	};

	const handleAuthorChange = (author: string) => {
		setSelectedAuthor(author);
		setPreferences({ ...preferences, author: author });
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

			<div>
				<h3>Author</h3>
				<input
					value={selectedAuthor || ''}
					onChange={(e) => handleAuthorChange(e.target.value)}
				/>
			</div>
			<button onClick={onRequestClose}>Close</button>
		</Modal>
	);
};

export default FilterModal;
