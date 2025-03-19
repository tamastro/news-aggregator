import React from 'react';

type FilterPanelProps = {
	onSourceChanged: (newSource: string) => void;
	onCategoryChanged: (newCategory: string) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
	onSourceChanged,
	onCategoryChanged,
}) => {
	const handleFilterChange = (data: string, target: string) => {
		switch (target) {
			case 'source':
				onSourceChanged(data);
				break;
			case 'category':
				onCategoryChanged(data);
				break;
		}
	};

	return (
		<div>
			<label>
				<select onChange={(e) => handleFilterChange(e.target.value, 'source')}>
					<option value='newsApi'>news API</option>
					<option value='guardian'>The Guardian</option>
					<option value='newYorkTimes'>New York Times</option>
				</select>
			</label>
			<label>
				<select
					onChange={(e) => handleFilterChange(e.target.value, 'category')}
				>
					<option value='General'>General</option>
					<option value='Economy'>Economy</option>
					<option value='Politics'>Politics</option>
					<option value='Business'>Business</option>
					<option value='Technology'>Technology</option>
					<option value='Health'>Health</option>
					<option value='Science'>Science</option>
					<option value='Entertainment'>Entertainment</option>
					<option value='Sports'>Sports</option>
					<option value='Environment'>Environment</option>
				</select>
			</label>
		</div>
	);
};

export default FilterPanel;
