export const city = {
  state: {
    city: 10,
    latitude: 44.561141,
    longitude: 38.076809,
    zoom: 14,
  },
  reducers: {
    setCity: (state, payload) => ({
      ...state,
      city: payload,
    }),
    setLatitude: (state, payload) => ({
      ...state,
      latitude: payload,
    }),
    setLongitude: (state, payload) => ({
      ...state,
      longitude: payload,
    }),
    setZoom: (state, payload) => ({
      ...state,
      zoom: payload,
    }),
  },
};
