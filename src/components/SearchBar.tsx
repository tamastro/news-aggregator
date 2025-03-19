import React, { useState } from 'react';

interface SearchBarProps {
	onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [keyword, setKeyword] = useState('');

	const handleSearch = () => {
		onSearch(keyword);
	};

	return (
		<div>
			<input
				type='text'
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search articles...'
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
};

export default SearchBar;
