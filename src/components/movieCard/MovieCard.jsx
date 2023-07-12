import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import Img from '../lazyLoadImage/Image';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import PosterFallback from '../../assets/no-poster.png';

const MovieCard = ({ data, fromSearch, mediaType }) => {
	const navigate = useNavigate();
	const posterUrl = data.images.jpg.large_image_url ? data.images.jpg.large_image_url : PosterFallback;

	const release_Date = data.published ? data.published.from : data.aired.form;

	return (
		<div className='movieCard' onClick={() => navigate(`/anime/${data.mal_id}`)}>
			<div className='posterBlock'>
				<Img className='posterImg' src={posterUrl} />
				{!fromSearch && (
					<React.Fragment>
						<CircleRating rating={data.score ? data.score.toFixed(1) : ''} />
						<Genres data={data.genres.slice(0, 2)} />
					</React.Fragment>
				)}
			</div>
			<div className='textBlock'>
				<span className='title'>{data.title_english}</span>

				<span className='date'>{dayjs(release_Date).format('MMM D, YYYY')}</span>
			</div>
		</div>
	);
};

export default MovieCard;
