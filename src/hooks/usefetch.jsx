import { useEffect, useState } from 'react';
import { fetchdatafromapi } from '../utils/api';
const useFetch = (url) => {
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading('loading...');
		setItem(null);
		setError(null);

		fetchdatafromapi(url)
			.then((res) => {
				setLoading(false);
				setItem(res);
			})
			.catch((err) => {
				setLoading(false);
				setError('Something went wrong!');
			});
	}, [url]);

	return { item, loading, error };
};

export default useFetch;
