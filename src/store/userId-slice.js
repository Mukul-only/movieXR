import { createSlice } from "@reduxjs/toolkit";
const UserIdSlice = createSlice({
  name: "UserIdSlice",
  initialState: { userId: "" },
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },
    reset(state) {
      state.userId = "";
    },
  },
});

export const userIdSliceAction = UserIdSlice.actions;
export default UserIdSlice;
