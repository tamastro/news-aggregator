import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import { useFilteredArticles } from '../hooks/useArticles';
import FilterPanel from '../components/FilterPanel';

const Home: React.FC = () => {
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [source, setSource] = useState('');

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
	);

	const onSourceChanged = (newSource: string) => {
		setSource(newSource);
	};

	const onCategoryChanged = (newCategory: string) => {
		setCategory(newCategory);
	};

	const resetFilter = () => {
		setKeyword('');
		setCategory('');
		setDateRange({
			startDate: null,
			endDate: null,
		});
		setSource('');
	};

	useEffect(() => {
		refetch();
	}, [source, category, keyword]);

	return (
		<div>
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
				data={data}
				isLoading={isLoading}
				isError={isError}
				error={error}
			/>
		</div>
	);
};

export default Home;
