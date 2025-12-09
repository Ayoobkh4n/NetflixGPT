import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    selectLang: "en",
  },
  reducers: {
    changeLang: (state, action) => {
      state.selectLang = action.payload;
    },
  },
});

export const { changeLang } = configSlice.actions;
export default configSlice.reducer;
