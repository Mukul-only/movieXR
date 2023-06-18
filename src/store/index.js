import { configureStore } from "@reduxjs/toolkit";
import NavigationSlice from "./Navigation-slice";

const store = configureStore({
  reducer: { navigationSlice: NavigationSlice.reducer },
});
export default store;
