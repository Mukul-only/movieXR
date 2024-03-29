import { configureStore } from "@reduxjs/toolkit";
import NavigationSlice from "./Navigation-slice";
import FormValidationSlice from "./formValidation-slice";
import formDataSlice from "./formData-slice";
import IpSlice from "./ip-slice";
import MovieName from "./movieName-slice";
import UserIdSlice from "./userId-slice";

const store = configureStore({
  reducer: {
    navigationSlice: NavigationSlice.reducer,
    formValidation: FormValidationSlice.reducer,
    formData: formDataSlice.reducer,
    ip: IpSlice.reducer,
    movieName: MovieName.reducer,
    userId: UserIdSlice.reducer,
  },
});
export default store;
