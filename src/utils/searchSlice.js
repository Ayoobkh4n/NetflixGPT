import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    Gpt: false,
    movieName: null,
    searchResults: null,
  },
  reducers: {
    toggleGpt: (state, action) => {
      state.Gpt = !state.Gpt;
    },
    addMovieResult: (state, action) => {
      const { movieName, searchResult } = action.payload;
      state.movieName = movieName;
      state.searchResults = searchResult;
    },
  },
});

export const { toggleGpt, addMovieResult } = searchSlice.actions;
export default searchSlice.reducer;
