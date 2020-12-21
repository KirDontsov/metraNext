export const nav = {
  state: {
    accountClicked: false,
  },
  reducers: {
    setAccountClicked: (state, payload) => ({
      ...state,
      accountClicked: payload,
    }),
  },
};
