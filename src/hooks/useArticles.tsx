import { useQuery } from '@tanstack/react-query';
import {
	fetchNewsAPIArticles,
	fetchGuardianArticles,
	fetchNewwYorkNews,
} from '../services/newsApi';
import { Article } from '../types/Atricles';

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
		if (source === 'newsApi') {
			return fetchNewsAPIArticles(category, date, keyword, author);
		} else if (source === 'guardian') {
			return fetchGuardianArticles(category, date, keyword, author);
		} else if (source === 'newYorkTimes') {
			return fetchNewwYorkNews(category, date, keyword, author);
		} else {
			return fetchNewsAPIArticles(category, date, keyword, author);
		}
	};

	return useQuery<Article[], Error>({
		queryKey: ['filteredArticles', date, category, source],
		queryFn: fetchFilteredArticles,
	});
};
