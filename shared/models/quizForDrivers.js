export const quizForDrivers = {
  state: {
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    res: "",
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
    setRes: (state, payload) => ({
      ...state,
      res: payload,
    }),
  },
};
