import { createSlice } from '@reduxjs/toolkit';

const Homeslice = createSlice({
	name: 'Home',
	initialState: {
		url: {},
	},
	reducers: {
		getapiconfiguration: (state, action) => {
			state.url = action.payload;
		},
	},
});

export const { getapiconfiguration, getData } = Homeslice.actions;

export default Homeslice.reducer;
