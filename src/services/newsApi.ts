import axios from 'axios';

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

interface NewsResponse {
	status: string;
	copyright: string;
	section: string;
	last_updated: string;
	num_results: number;
	results: NewsArticle[];
}

interface NewsArticle {
	uri: string;
	url: string;
	id: number;
	asset_id: number;
	source: string;
	published_date: string;
	updated: string;
	section: string;
	subsection: string;
	nytdsection: string;
	adx_keywords: string;
	column: null | string;
	byline: string;
	type: string;
	title: string;
	abstract: string;
	des_facet: string[];
	org_facet: string[];
	per_facet: string[];
	geo_facet: string[];
	media: Media[];
	eta_id: number;
}

interface Media {
	type: string;
	subtype: string;
	caption: string;
	copyright: string;
	approved_for_syndication: number;
	'media-metadata': MediaMetadata[];
}

interface MediaMetadata {
	url: string;
	format: string;
	height: number;
	width: number;
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
			category,
		},
	});
	const data = response.data as { articles: newsAPIArticle[] };
	return data.articles;
};

export const fetchGuardianArticles = async (
	category: string,
	date: string,
	keyword: string,
): Promise<GuardianArticle[]> => {
	const response = await axios.get('https://content.guardianapis.com/search', {
		params: {
			q: keyword,
			section: category,
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
	return data;
};

export const fetchNewwYorkNews = async (
	category: string,
	date: string,
	keyword: string,
): Promise<NewsResponse | null> => {
	const apiKey = '5jc75X3YDaOVj5GiAJXoN3MGmGFYfmcr';
	const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

	const params = new URLSearchParams({
		q: keyword,
		fq: category,
		'api-key': apiKey,
	});

	const response = await axios.get<NewsResponse>(
		`${baseUrl}?${params.toString()}`,
	);
	const data = response.data.response.docs.map((article) => {
		const tempArticle = {
			title: '',
			description: '',
			author: '',
			url: '',
		};
		tempArticle.title = article.headline.main;
		tempArticle.description = article.abstract;
		tempArticle.author = article.byline.original;
		tempArticle.url = article.uri;
		return tempArticle;
	});
	return data;
};
