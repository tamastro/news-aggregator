import axios from 'axios';

const API_KEY = '10abd195939846a9a6e3bc79f125cedc';
const BASE_URL = 'https://newsapi.org/v2';

export interface Article {
	source: {
		id: string | null;
		name: string;
	};
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
}

export const fetchArticles = async (
	keyword: string = 'general',
): Promise<Article[]> => {
	const response = await axios.get(`${BASE_URL}/top-headlines`, {
		params: {
			q: keyword,
			country: 'us',
			apiKey: API_KEY,
		},
	});
	const data = response.data as { articles: Article[] };
	return data.articles;
};

export const fetchArticleByURL = async (url: string): Promise<Article> => {
	// Mock implementation for testing purposes
	const mockArticles = [
		{
			source: { id: 'abc-news', name: 'ABC News' },
			author: 'John Doe',
			title: 'Test Article 1',
			description: 'This is a test article.',
			url: 'https://example.com/article1',
			urlToImage: 'https://example.com/image1.jpg',
			publishedAt: '2023-10-01T12:00:00Z',
			content: 'This is the content of the test article.',
		},
	];

	const article = mockArticles.find((a) => a.url === url);
	if (!article) {
		throw new Error('Article not found');
	}
	return article;
};
