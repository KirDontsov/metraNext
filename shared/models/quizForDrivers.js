export const quizForDrivers = {
  state: {
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
  },
  reducers: {
    setPhone: (state, payload) => ({
      ...state,
      phone: payload,
    }),
    setEmail: (state, payload) => ({
      ...state,
      email: payload,
    }),
    setFirstName: (state, payload) => ({
      ...state,
      firstName: payload,
    }),
    setLastName: (state, payload) => ({
      ...state,
      lastName: payload,
    }),
  },
};
