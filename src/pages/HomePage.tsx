import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import { useFilteredArticles } from '../hooks/useArticles';
import FilterPanel from '../components/FilterPanel';

const Home: React.FC = () => {
	const [keyword, setKeyword] = useState('');
	const [category, setCategory] = useState('');
	const [newsDate, setNewsDat] = useState('');
	const [source, setSource] = useState('');

	const { data, isLoading, isError, error, refetch } = useFilteredArticles(
		category,
		newsDate,
		source,
		keyword,
	);

	const onFilterChanged = (newSource: string) => {
		setSource(newSource);
	};

	useEffect(() => {
		refetch();
	}, [source]);

	return (
		<div>
			<SearchBar onSearch={setKeyword} />
			<FilterPanel onFilterChange={onFilterChanged} />
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
