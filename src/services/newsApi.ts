import axios from 'axios';
import moment from 'moment';
import { Article } from '../types/atricles';
import {
	ArticleResponse,
	GuardianArticle,
	newsAPIArticle,
} from '../types/apiResponse';

export const fetchNewsAPIArticles = async (
	category: string,
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
	author: string,
): Promise<Article[]> => {
	const baseUrl = 'https://newsapi.org/v2';
	const apiKey = '8001d4a5c77f4e59b899ae5d6ea84865';
	let query = keyword;
	if (category) {
		query += `+${category}`;
	}
	if (author) {
		query += `+${author.replace(/\s+/g, '+')}`;
	}
	const response = await axios.get(`${baseUrl}/everything`, {
		params: {
			q: query, //because the apii does not have category params
			apiKey: apiKey,
			searchIn: `title${category ? ',content' : ''}`,
			qInTitle: 'BBC News',
			from: date.startDate,
			to: date.endDate,
		},
	});
	const data = (response.data as { articles: newsAPIArticle[] }).articles.map(
		(article) => {
			const tempArticle = {
				title: article.title,
				description: article.description || '',
				url: article.url,
				author: article.author || '',
			};
			return tempArticle;
		},
	);
	return data;
};

export const fetchGuardianArticles = async (
	category: string,
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
	author: string,
): Promise<Article[]> => {
	const baseUrl: string = 'https://content.guardianapis.com/search';
	const apiKey: string = 'de041d55-bade-4973-a869-ab18818b0f4d';
	const response = await axios.get(baseUrl, {
		params: category
			? {
					q: keyword,
					section: category,
					'api-key': apiKey,
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
	const data = (
		response.data as { response: { results: GuardianArticle[] } }
	).response.results.map((article) => {
		const tempArticle = {
			title: '',
			description: '',
			author: author,
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

export const fetchNewYorkNews = async (
	category: string,
	date: {
		startDate: Date | null;
		endDate: Date | null;
	},
	keyword: string,
	author: string,
): Promise<Article[] | null> => {
	const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
	const apiKey = '5jc75X3YDaOVj5GiAJXoN3MGmGFYfmcr';

	const baseParams = {
		q: `${keyword}${author ? `+${author.replace(/\s+/g, '+')}` : ''}`,
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

	const response = await axios.get<ArticleResponse>(baseUrl, {
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
