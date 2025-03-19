import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Article } from '../services/newsApi';
// import { fetchArticleByURL } from '../services/newsApi';
import Loading from './Loading';
import Error from './Error';

const ArticleDetail: React.FC = () => {
	const { url } = useParams<{ url: string }>();

	// const { data, isLoading, isError, error } = useQuery<Article, Error>(
	// 	['article', url],
	// 	() => fetchArticleByURL(decodeURIComponent(url!)),
	// );

	// if (isLoading) return <Loading />;
	// if (isError) return <Error message={(error as Error).message} />;

	return (
		<div>
			{/* <h1>{data?.title}</h1>
			<p>{data?.description}</p>
			<img
				src={data?.urlToImage}
				alt={data?.title}
			/>
			<p>{data?.content}</p>
			<a
				href={data?.url}
				target='_blank'
				rel='noopener noreferrer'
			>
				Read more
			</a> */}
		</div>
	);
};

export default ArticleDetail;
