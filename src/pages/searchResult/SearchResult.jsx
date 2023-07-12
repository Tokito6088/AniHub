import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import './style.scss';

import { fetchdatafromapi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';
import PageNotFound from '../404/PageNotFound';

const SearchResult = () => {
	const [data, setData] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);
	const { query } = useParams();

	const fetchInitialData = () => {
		setLoading(true);
		fetchdatafromapi(`anime?q=${query}&page=${pageNum}`).then((res) => {
			setData(res);
			setLoading(false);
		});
	};

	const fetchNextPageData = () => {
		fetchdatafromapi(`anime?q=${query}&page=${pageNum}`).then((res) => {
			if (res?.data) {
				setData({
					...data,
					data: [...data?.data, ...res?.data],
				});
				setPageNum((prev) => prev + 1);
			} else {
				setData(res);
			}
		});
	};

	useEffect(() => {
		setPageNum(1);
		fetchInitialData();
	}, [query]);

	return (
		<div className='searchResultsPage'>
			{loading && <Spinner initial={true} />}
			{!loading && (
				<ContentWrapper>
					{data?.data?.length > 0 ? (
						<>
							<div className='pageTitle'>{`Search Result Of '${query}'`}</div>

							<InfiniteScroll className='content' dataLength={data?.data?.length || []} next={fetchNextPageData} hasMore={pageNum <= data.pagination.last_visible_page} loader={<Spinner />}>
								{data?.data?.map((item, index) => {
									return <MovieCard key={index} data={item} fromSearch={true} />;
								})}
							</InfiniteScroll>
						</>
					) : (
						<PageNotFound />
					)}
				</ContentWrapper>
			)}
		</div>
	);
};

export default SearchResult;
