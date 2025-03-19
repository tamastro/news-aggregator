import React from 'react';
import { useArticles } from '../hooks/useArticles';
import { Article } from '../services/newsApi';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';

type ArticleListProps = {
	keyword: string;
};

const ArticleList: React.FC<ArticleListProps> = ({ keyword }) => {
	const { data, isLoading, isError, error } = useArticles(keyword);

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
						<Link to={`/article/${encodeURIComponent(article.url)}`}>
							<h2 className='title'>{article.title}</h2>
						</Link>
						<p className='description'>{article.description}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArticleList;
