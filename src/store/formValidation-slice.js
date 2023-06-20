import { createSlice } from "@reduxjs/toolkit";
const FormValidationSlice = createSlice({
  name: "formValidationSlice",
  initialState: { touched: false, feildsAreValid: [], formIsValid: false },
  reducers: {
    setFeildValidity(state, action) {
      const newItem = action.payload;
      const existingItem = state.feildsAreValid.find(
        (item) => item.id === newItem.id && item.name === newItem.name
      );
      if (existingItem) {
        existingItem.valid = newItem.valid;
      } else {
        state.feildsAreValid.push({
          id: newItem.id,
          name: newItem.name,
          valid: newItem.valid,
        });
      }
      let newValidity = true;
      state.feildsAreValid.forEach((element) => {
        newValidity = newValidity && element.valid;
      });
      state.formIsValid = newValidity;
    },
    setTouched(state, action) {
      state.touched = action.payload;
    },
    removeFeildValidity(state, action) {
      state.feildsAreValid = state.feildsAreValid.filter(
        (item) => item.id !== action.payload
      );
      state.feildsAreValid.forEach((item) =>
        item.id > action.payload ? item.id-- : item.id
      );
      let newValidity = true;
      state.feildsAreValid.forEach((element) => {
        newValidity = newValidity && element.valid;
      });
      state.formIsValid = newValidity;
    },

    reset(state) {
      state.touched = false;
      state.feildsAreValid = [];
      state.formIsValid = false;
    },
  },
});
export const formValidationAction = FormValidationSlice.actions;
export default FormValidationSlice;
