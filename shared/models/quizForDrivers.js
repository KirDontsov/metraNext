export const quizForDrivers = {
	state: {
		phone: "",
		email: ""
	},
	reducers: {
		setPhone: (state, payload) => ({
			...state,
			phone: payload
		}),
		setEmail: (state, payload) => ({
			...state,
			email: payload
		})
	}
};
