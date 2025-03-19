import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';

const Home: React.FC = () => {
	const [keyword, setKeyword] = useState('');
	return (
		<div>
			<SearchBar onSearch={setKeyword} />
			{/* <FilterPanel /> */}
			<ArticleList keyword={keyword} />
		</div>
	);
};

export default Home;
