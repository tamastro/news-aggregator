import { useQuery } from '@tanstack/react-query';
import {
	fetchNewsAPIArticles,
	fetchGuardianArticles,
	Article,
} from '../services/newsApi';

export const useFilteredArticles = (
	date: string,
	category: string,
	source: string,
	keyword: string,
) => {
	const fetchFilteredArticles = async () => {
		if (source === 'newsApi') {
			return fetchNewsAPIArticles(category, date, keyword);
		} else if (source === 'guardian') {
			return fetchGuardianArticles(category, date, keyword);
		} else if (source === 'source3') {
			return fetchNewsAPIArticles(category, date, keyword);
		} else {
			return fetchNewsAPIArticles(category, date, keyword);
		}
	};

	return useQuery<Article[], Error>({
		queryKey: ['filteredArticles', date, category, source],
		queryFn: fetchFilteredArticles,
	});
};
