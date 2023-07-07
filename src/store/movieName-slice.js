import { createSlice } from "@reduxjs/toolkit";
const MovieName = createSlice({
  name: "MovieName",
  initialState: { name: "" },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    reset(state) {
      state.name = "";
    },
  },
});

export const MovieNameAction = MovieName.actions;
export default MovieName;
