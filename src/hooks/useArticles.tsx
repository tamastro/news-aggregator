import { useQuery } from '@tanstack/react-query';
import { fetchArticles, Article } from '../services/newsApi';

export const useArticles = (keyword: string = '') => {
	return useQuery<Article[], Error>({
		queryKey: ['articles', keyword],
		queryFn: () => fetchArticles(keyword),
	});
};
