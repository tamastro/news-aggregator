import axios from 'axios';
import moment from 'moment';

const API_KEY = '8001d4a5c77f4e59b899ae5d6ea84865';
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
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
): Promise<newsAPIArticle[]> => {
	const response = await axios.get(`${BASE_URL}/everything`, {
		params: {
			q: `${keyword}${category ? `+${category}` : ''}`, //because the apii does not have category params
			apiKey: API_KEY,
			searchIn: `title${category ? ',content' : ''}`,
			qInTitle: 'BBC News',
			from: date.startDate,
			to: date.endDate,
		},
	});
	const data = response.data as { articles: newsAPIArticle[] };
	return data.articles;
};

export const fetchGuardianArticles = async (
	category: string,
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
): Promise<GuardianArticle[]> => {
	const response = await axios.get('https://content.guardianapis.com/search', {
		params: category
			? {
					q: keyword,
					section: category,
					'api-key': 'de041d55-bade-4973-a869-ab18818b0f4d',
					'show-fields': 'all',
					'from-date': date.startDate,
					'to-date': date.endDate,
			  }
			: {
					q: keyword,
					'api-key': 'de041d55-bade-4973-a869-ab18818b0f4d',
					'show-fields': 'all',
					'from-date': date.startDate,
					'to-date': date.endDate,
			  },
	});
	const data = response.data.response.results.map((article) => {
		const tempArticle = {
			title: '',
			description: '',
			author: '',
			url: '',
		};
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
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
): Promise<NewsResponse | null> => {
	const apiKey = '5jc75X3YDaOVj5GiAJXoN3MGmGFYfmcr';
	const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

	const baseParams = {
		q: keyword,
		fq: category,
		'api-key': apiKey,
	};

	const dateParams = {
		begin_date: moment(date.startDate).format('YYYYMMDD'),
		end_date: moment(date.endDate).format('YYYYMMDD'),
	};

	const withDateParams = {
		...baseParams,
		...dateParams,
	};

	const response = await axios.get<NewsResponse>(baseUrl, {
		params: date.startDate && date.endDate ? withDateParams : baseParams,
	});
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
