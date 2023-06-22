import { createSlice } from "@reduxjs/toolkit";
const formDataSlice = createSlice({
  name: "formDataSlice",
  initialState: { formData: [], retriveDataFlag: false },
  reducers: {
    setFormData(state, action) {
      const newItem = action.payload;
      const isAvailable = state.formData.length - 1 >= newItem.id;
      if (isAvailable) {
        state.formData[newItem.id][newItem.name] = newItem.val;
      } else {
        const name = newItem.name;
        const val = newItem.val;
        const data = {};
        data[name] = val;

        state.formData.push(data);
      }
    },
    updateFormLinks(state, action) {
      const urls = action.payload;
      // console.log(urls);
      state.formData.forEach((element) => {
        element.download_link = urls[element.download_link];
      });
    },
    removeFormData(state, action) {
      state.formData = state.formData.filter(
        (item, index) => index !== action.payload
      );
    },
    toogleFlag(state) {
      state.retriveDataFlag = !state.retriveDataFlag;
    },
    reset(state) {
      state.formData = [];
      state.retriveDataFlag = false;
    },
  },
});
export const formDataAction = formDataSlice.actions;
export default formDataSlice;
