import axios from 'axios';
import Article from '../pages/ArticlePage';

const API_KEY = '10abd195939846a9a6e3bc79f125cedc';
const BASE_URL = 'https://newsapi.org/v2';

export interface newsAPIArticle {
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

export interface GuardianArticle {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	isHosted: boolean;
	pillarId: string;
	pillarName: string;
	fields: any[];
}

export const fetchNewsAPIArticles = async (
	category: string,
	date: string,
	keyword: string,
): Promise<newsAPIArticle[]> => {
	const response = await axios.get(`${BASE_URL}/top-headlines`, {
		params: {
			q: keyword,
			country: 'us',
			apiKey: API_KEY,
		},
	});
	const data = response.data as { articles: newsAPIArticle[] };
	return data.articles;
};

export const fetchArticleByURL = async (
	url: string,
): Promise<newsAPIArticle> => {
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

export const fetchGuardianArticles = async (
	category: string,
	date: string,
	keyword: string,
): Promise<GuardianArticle[]> => {
	const response = await axios.get('https://content.guardianapis.com/search', {
		params: {
			q: keyword,
			'api-key': 'de041d55-bade-4973-a869-ab18818b0f4d',
			'show-fields': 'all',
		},
	});
	const data = response.data.response.results.map((article) => {
		const tempArticle = {
			title: '',
			description: '',
			author: '',
			url: '',
		};
		console.log(article.fields);
		tempArticle.title = article.fields.headline;
		tempArticle.description = article.fields.trailText;
		tempArticle.author = article.fields.byline ? article.fields.byline : '-';
		tempArticle.url = article.fields.shortUrl;
		return tempArticle;
	});
	console.log(data);
	return data;
};
