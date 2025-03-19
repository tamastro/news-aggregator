import React, { useState } from 'react';

type FilterPanelProps = {
	onSourceChanged: (newSource: string) => void;
	onCategoryChanged: (newCategory: string) => void;
	onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
	onSourceChanged,
	onCategoryChanged,
	onDateRangeChange,
}) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		type: 'start' | 'end',
	) => {
		const selectedDate = new Date(event.target.value);
		if (type === 'start') {
			setStartDate(selectedDate);
			if (endDate && selectedDate > endDate) {
				setEndDate(selectedDate);
			}
			onDateRangeChange(selectedDate, endDate);
		} else {
			setEndDate(selectedDate);
			if (startDate && selectedDate < startDate) {
				setStartDate(selectedDate);
			}
			onDateRangeChange(startDate, selectedDate);
		}
	};
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
		<>
			<div>
				<label>
					<select
						onChange={(e) => handleFilterChange(e.target.value, 'source')}
					>
						<option value='newsApi'>news API</option>
						<option value='guardian'>The Guardian</option>
						<option value='newYorkTimes'>New York Times</option>
					</select>
				</label>
			</div>
			<div>
				<label>
					<select
						onChange={(e) => handleFilterChange(e.target.value, 'category')}
						defaultValue={''}
					>
						<option value='general'>General</option>
						<option value='economy'>Economy</option>
						<option value='politics'>Politics</option>
						<option value='business'>Business</option>
						<option value='technology'>Technology</option>
						<option value='health'>Health</option>
						<option value='science'>Science</option>
						<option value='entertainment'>Entertainment</option>
						<option value='sports'>Sports</option>
						<option value='environment'>Environment</option>
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
		</>
	);
};

export default FilterPanel;
