import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/usefetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Image';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import axios from 'axios';

const HeroBanner = () => {
	const { url } = useSelector((state) => state.Home);

	const [background, setBackground] = useState('');
	const [query, setQuery] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const bg = url;
		setBackground(bg);
	}, [url]);

	const searchQueryHandler = (event) => {
		if (event.key == 'Enter' && query.length > 0) {
			event.preventDefault();
			navigate(`/search/${query}`);
		}
	};
	return (
		<div className='heroBanner'>
			<div className='backdrop-img'>
				<Img src={background} />
			</div>
			<div className='opacity-layer'></div>
			<ContentWrapper>
				<div className='wrapper'>
					<div className='heroBannerContent'>
						<span className='subtitle'>World Larges Anime DataBase</span>
						<div className='heroBannerSearchInput'>
							<input type='text' placeholder='search for anime or manga....' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
							<button onClick={() => navigate(`/search/${query}`)}>Search</button>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
};

export default HeroBanner;
