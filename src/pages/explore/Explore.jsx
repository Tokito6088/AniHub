import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';

import './style.scss';

import { fetchdatafromapi } from '../../utils/api';
import useFetch from '../../hooks/usefetch';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';

const Explore = () => {
	const [data, setData] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);
	const { mediaType } = useParams();

	const fetchInitialData = () => {
		fetchdatafromapi(`${mediaType}?page=${pageNum}`).then((res) => {
			setLoading(true);
			setData(res);
			setPageNum((prev) => prev + 1);
			setLoading(false);
		});
	};

	const fetchNextPageData = () => {
		fetchdatafromapi(`${mediaType}?page=${pageNum}`).then((res) => {
			if (res?.data) {
				setData({
					...data,
					data: [...data?.data, ...res.data],
				});
			} else {
				setData(res);
			}
			setPageNum((prev) => prev + 1);
		});
	};

	useEffect(() => {
		setData(null);
		setPageNum(1);
		fetchInitialData();
	}, [mediaType]);

	return (
		<div className='explorePage'>
			<ContentWrapper>
				<div className='pageHeader'>
					<div className='pageTitle'>explore</div>
				</div>
				{loading && <Spinner initial={true} />}
				{!loading && (
					<>
						{data?.data?.length > 0 ? (
							<InfiniteScroll className='content' dataLength={data?.data?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.pagination.last_visible_page} loader={<Spinner />}>
								{data?.data?.map((item, index) => {
									return <MovieCard key={index} data={item} mediaType={mediaType} />;
								})}
							</InfiniteScroll>
						) : (
							<span className='resultNotFound'>Sorry, Results not found!</span>
						)}
					</>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Explore;
