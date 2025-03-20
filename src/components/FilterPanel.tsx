import React, { useState } from 'react';
import { camelCaseToTitleCase } from '../helper/camelCaseToString';

type dateRangeType = {
	startDate: Date | null;
	endDate: Date | null;
};

type FilterPanelProps = {
	onSourceChanged: (newSource: string) => void;
	onCategoryChanged: (newCategory: string) => void;
	onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
	onResetFilter: () => void;
	category: string;
	source: string;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
	onSourceChanged,
	onCategoryChanged,
	onDateRangeChange,
	onResetFilter,
	category,
	source,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		type: 'start' | 'end' | 'reset',
	) => {
		const selectedDate = new Date(event.target.value);
		switch (type) {
			case 'start':
				setStartDate(selectedDate);
				if (endDate && selectedDate > endDate) {
					setEndDate(selectedDate);
				}
				onDateRangeChange(selectedDate, endDate);
				break;
			case 'end':
				setEndDate(selectedDate);
				if (startDate && selectedDate < startDate) {
					setStartDate(selectedDate);
				}
				onDateRangeChange(startDate, selectedDate);
				break;
		}
	};

	const handleReset = () => {
		setEndDate(null);
		setStartDate(null);
		onResetFilter();
	};

	return (
		<>
			<div>
				<label>
					<select
						value={source}
						onChange={(e) => onSourceChanged(e.target.value)}
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
				</label>
			</div>
			<div>
				<label>
					<select
						value={category}
						onChange={(e) => onCategoryChanged(e.target.value)}
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
				</label>
			</div>
			<div className='date-range-picker'>
				<label>
					Start Date:
					<input
						type='date'
						value={startDate ? startDate.toISOString().split('T')[0] : ''}
						onChange={(e) => handleDateChange(e, 'start')}
					/>
				</label>
				<label>
					End Date:
					<input
						type='date'
						value={endDate ? endDate.toISOString().split('T')[0] : ''}
						onChange={(e) => handleDateChange(e, 'end')}
					/>
				</label>
			</div>
			<button onClick={() => handleReset()}>Reset</button>
		</>
	);
};

export default FilterPanel;
