import React from 'react';
import './style.scss';

const Genres = ({ data }) => {
	return (
		<div className='genres'>
			{data?.map((item, index) => {
				return (
					<div key={index} className='genre'>
						{item?.name}
					</div>
				);
			})}
		</div>
	);
};

export default Genres;
