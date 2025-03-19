import { useQuery } from '@tanstack/react-query';
import {
	fetchNewsAPIArticles,
	fetchGuardianArticles,
	fetchNewwYorkNews,
} from '../services/newsApi';
import { Article } from '../types/Atricles';

export const useFilteredArticles = (
	category: string,
	date: string,
	source: string,
	keyword: string,
) => {
	const fetchFilteredArticles = async () => {
		if (source === 'newsApi') {
			return fetchNewsAPIArticles(category, date, keyword);
		} else if (source === 'guardian') {
			return fetchGuardianArticles(category, date, keyword);
		} else if (source === 'newYorkTimes') {
			return fetchNewwYorkNews(category, date, keyword);
		} else {
			return fetchNewsAPIArticles(category, date, keyword);
		}
	};

	return useQuery<Article[], Error>({
		queryKey: ['filteredArticles', date, category, source],
		queryFn: fetchFilteredArticles,
	});
};
