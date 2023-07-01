import { createSlice } from "@reduxjs/toolkit";
const IpSlice = createSlice({
  name: "ipslice",
  initialState: { ip: "" },
  reducers: {
    setIp(state, action) {
      state.ip = action.payload;
    },
    reset(state) {
      state.ip = "";
    },
  },
});

export const ipSliceAction = IpSlice.actions;
export default IpSlice;
