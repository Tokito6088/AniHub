import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/usefetch';
import Carousel from '../../../components/carousel/Carousel';
import { useDispatch } from 'react-redux';
import { getapiconfiguration } from '../../../store/homeSlice';

const TopRated = () => {
	const dispatch = useDispatch();
	const [endPoint, setEndPoint] = useState('anime');

	const { item, loading } = useFetch(`top/${endPoint}?page=3`);

	const randomImage = item?.data[Math.floor(Math.random() * 25)]?.images.webp.large_image_url;

	dispatch(getapiconfiguration(randomImage));

	const onTabChange = (tab) => {
		setEndPoint(tab == 'Anime' ? 'anime' : 'manga');
	};

	return (
		<div className='carouselSection'>
			<ContentWrapper>
				<span className='carouselTitle'>Top Rated</span>
				<SwitchTabs data={['Anime', 'Manga']} onTabChange={onTabChange} />
			</ContentWrapper>
			<Carousel endPoint={endPoint} data={item?.data} loading={loading} />
		</div>
	);
};

export default TopRated;
