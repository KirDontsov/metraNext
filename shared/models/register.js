export const register = {
	state: {
		phone: "",
		name: "",
		res: "",
	},
	reducers: {
		setPhone: (state, payload) => ({
			...state,
			phone: payload,
		}),
		setName: (state, payload) => ({
			...state,
			name: payload,
		}),
		setRes: (state, payload) => ({
			...state,
			res: payload,
		}),
	},
};
