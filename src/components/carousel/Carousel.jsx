import React, { useRef } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Image';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

import './style.scss';

const Carousel = ({ data, loading, endPoint }) => {
	console.log(data);
	const carouselContainer = useRef();
	const navigate = useNavigate();

	const navigation = (dir) => {
		const container = carouselContainer.current;
		const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
		console.log('offsetwidth' + container.offsetWidth);
		console.log(container.scrollLeft);

		container.scrollTo({
			left: scrollAmount,
			behavior: 'smooth',
		});
	};

	const skItem = () => {
		return (
			<div className='skeletonItem'>
				<div className='posterBlock skeleton'></div>
				<div className='textBlock'>
					<div className='title skeleton'></div>
					<div className='date skeleton'></div>
				</div>
			</div>
		);
	};

	return (
		<div className='carousel'>
			<ContentWrapper>
				<BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() => navigation('left')} />
				<BsFillArrowRightCircleFill className='carouselRighttNav arrow' onClick={() => navigation('right')} />
				{!loading ? (
					<div className='carouselItems' ref={carouselContainer}>
						{data?.map((item) => {
							const posterUrl = item?.images.jpg.image_url ? item.images.jpg.image_url : PosterFallback;

							return (
								<div className='carouselItem' onClick={() => navigate(`/${endPoint}/${item.mal_id}`)} key={item.id}>
									<div className='posterBlock'>
										<Img src={posterUrl} />
										<CircleRating rating={item.score.toFixed(1)} />
										<Genres data={item.genres} />
									</div>
									<div className='textBlock'>
										<span className='title'>{item.title_english}</span>

										<span className='date'>{item.aired ? dayjs(item.aired.from).format('MMM D , YYYY') : ''}</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className='loadingSkeleton'>
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};

export default Carousel;
