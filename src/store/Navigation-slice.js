import { createSlice } from "@reduxjs/toolkit";
const NavigationSlice = createSlice({
  name: "navigationSlice",
  initialState: { url: "/" },
  reducers: {
    setUrl(state, action) {
      state.url = action.payload;
    },
    reset(state) {
      state.url = "/";
    },
  },
});
export const navigationAction = NavigationSlice.actions;
export default NavigationSlice;
