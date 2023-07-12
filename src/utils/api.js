import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4/';

export const fetchdatafromapi = async (url) => {
	try {
		const { data } = await axios.get(BASE_URL + url);
		return data;
	} catch (err) {
		console.log('err');
		return err;
	}
};
