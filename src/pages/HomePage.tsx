import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import { useFilteredArticles } from '../hooks/useArticles';
import FilterPanel from '../components/FilterPanel';
import FilterModal from '../components/FilterModal';
import { usePreferences } from '../contexts/PreferencesContext';
import { Article } from '../types/atricles';

const Home: React.FC = () => {
	const { preferences } = usePreferences();
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState(preferences.category);
	const [source, setSource] = useState(preferences.source);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [dateRange, setDateRange] = useState<{
		startDate: Date | null;
		endDate: Date | null;
	}>({
		startDate: null,
		endDate: null,
	});

	const handleDateRangeChange = (
		startDate: Date | null,
		endDate: Date | null,
	) => {
		setDateRange({ startDate, endDate });
	};

	const { data, isLoading, isError, error, refetch } = useFilteredArticles(
		category,
		dateRange,
		source,
		keyword,
		preferences.author,
	);

	const toggleModal = () => setIsModalOpen(!isModalOpen);

	const onSourceChanged = (newSource: string) => {
		setSource(newSource);
	};

	const onCategoryChanged = (newCategory: string) => {
		setCategory(newCategory);
	};

	const resetFilter = () => {
		setKeyword('');
		setCategory(preferences.category);
		setDateRange({
			startDate: null,
			endDate: null,
		});
		setSource(preferences.source);
	};

	useEffect(() => {
		refetch();
	}, [source, category, keyword]);

	return (
		<div>
			<button onClick={toggleModal}>Open Preferences Filter</button>
			<FilterModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
			/>
			<SearchBar
				onSearch={setKeyword}
				query={keyword}
			/>
			<FilterPanel
				onSourceChanged={onSourceChanged}
				onCategoryChanged={onCategoryChanged}
				onDateRangeChange={handleDateRangeChange}
				onResetFilter={resetFilter}
				category={category}
				source={source}
			/>
			<ArticleList
				data={data as Article[]}
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>
		</div>
	);
};

export default Home;
