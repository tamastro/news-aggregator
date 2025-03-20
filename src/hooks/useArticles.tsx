import { useQuery } from '@tanstack/react-query';
import {
	fetchNewsAPIArticles,
	fetchGuardianArticles,
	fetchNewYorkNews,
} from '../services/newsApi';
import { Article } from '../types/atricles';

export const useFilteredArticles = (
	category: string,
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	source: string,
	keyword: string,
	author: string,
) => {
	const fetchFilteredArticles = async () => {
		switch (source) {
			case 'newsApi':
				return fetchNewsAPIArticles(category, date, keyword, author) || [];
			case 'guardian':
				return fetchGuardianArticles(category, date, keyword, author) || [];
			case 'newYorkTimes':
				return fetchNewYorkNews(category, date, keyword, author) || [];
			default:
				return [];
		}
	};

	return useQuery<Article[], Error>({
		queryKey: ['filteredArticles', date, category, source],
		// @ts-expect-error function is working fine doesnt needd an overload call
		queryFn: fetchFilteredArticles,
	});
};
