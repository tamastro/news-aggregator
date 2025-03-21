import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (keyword: string) => void;
	query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [keyword, setKeyword] = useState('');

	const handleSearch = () => {
		onSearch(keyword);
	};

	return (
		<div className='search-bar-container'>
			<input
				type='text'
				className='search-bar'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search articles...'
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
};

export default SearchBar;
