import React from 'react';
import { Article } from '../types/atricles';
import Loading from './Loading';
import Error from './Error';

type ArticleListProps = {
	isLoading: boolean;
	isError: boolean;
	data: Article[];
	error: unknown;
};

const ArticleList: React.FC<ArticleListProps> = ({
	data,
	isLoading,
	isError,
	error,
}) => {
	if (isLoading) return <Loading />;
	if (isError) return <Error message={(error as Error).message} />;

	return (
		<div>
			<ul className='news-list'>
				{(data as Article[])?.map((article: Article) => (
					<li
						key={article.url}
						className='news-item'
					>
						<h2 className='title'>{article.title}</h2>
						<h6>By {article.author}</h6>
						<p className='description'>{article.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArticleList;
