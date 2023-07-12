import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/usefetch';
import Carousel from '../../../components/carousel/Carousel';

const Popular = () => {
	const [endPoint, setEndPoint] = useState('anime');

	const { item, loading } = useFetch(`top/${endPoint}?page=2`);

	const onTabChange = (tab) => {
		setEndPoint(tab == 'Anime' ? 'anime' : 'manga');
	};

	return (
		<div className='carouselSection'>
			<ContentWrapper>
				<span className='carouselTitle'>Most Popular</span>
				<SwitchTabs data={['Anime', 'Manga']} onTabChange={onTabChange} />
			</ContentWrapper>
			<Carousel endPoint={endPoint} data={item?.data} loading={loading} />
		</div>
	);
};

export default Popular;
