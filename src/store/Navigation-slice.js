import { createSlice } from "@reduxjs/toolkit";
const NavigationSlice = createSlice({
  name: "navigationSlice",
  initialState: { url: "/", reqUrl: "/" },
  reducers: {
    setUrl(state, action) {
      state.url = action.payload;
    },
    setReqUrl(state, action) {
      state.reqUrl = action.payload;
    },
    reset(state) {
      state.url = "/";
      state.reqUrl = "/";
    },
  },
});
export const navigationAction = NavigationSlice.actions;
export default NavigationSlice;
