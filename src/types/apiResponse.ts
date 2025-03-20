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
export interface GuardianResponse {
	status: string;
	userTier: string;
	total: number;
	startIndex: number;
	pageSize: number;
	currentPage: number;
	pages: number;
	orderBy: string;
	results: GuardianArticle[];
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
	fields: {
		headline: string;
		standfirst: string;
		trailText: string;
		byline: string;
		main: string;
		body: string;
		wordcount: string;
		firstPublicationDate: string;
		lastModified: string;
		publication: string;
		shortUrl: string;
		lang: string;
		isLive: boolean;
		bodyText: string;
	};
}

export interface ArticleResponse {
	status: string;
	copyright: string;
	response: {
		docs: ArticleDoc[];
		meta: {
			hits: number;
			offset: number;
			time: number;
		};
	};
}

export interface ArticleDoc {
	abstract: string;
	web_url: string;
	snippet: string;
	lead_paragraph: string;
	print_section: string;
	print_page: string;
	source: string;
	multimedia: Multimedia[];
	headline: Headline;
	keywords: Keyword[];
	pub_date: string;
	document_type: string;
	news_desk: string;
	section_name: string;
	byline: Byline;
	type_of_material: string;
	_id: string;
	word_count: number;
	uri: string;
}

export interface Multimedia {
	rank: number;
	subtype: string;
	caption: string | null;
	credit: string | null;
	type: string;
	url: string;
	height: number;
	width: number;
	legacy: Legacy;
}

export interface Legacy {
	xlarge?: string;
	xlargewidth?: number;
	xlargeheight?: number;
	thumbnail?: string;
	thumbnailwidth?: number;
	thumbnailheight?: number;
}

export interface Headline {
	main: string;
	kicker: string | null;
	content_kicker: string | null;
	print_headline: string | null;
	name: string | null;
	seo: string | null;
	sub: string | null;
}

export interface Keyword {
	name: string;
	value: string;
	rank: number;
	major: string;
}

export interface Byline {
	original: string;
	person: Person[];
	organization: string | null;
}

export interface Person {
	firstname: string;
	middlename: string | null;
	lastname: string;
	qualifier: string | null;
	title: string | null;
	role: string;
	organization: string;
	rank: number;
}
