import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstant";
import { useRef } from "react";
import client from "../utils/openaiConfig";
import { API_Options } from "../utils/constants";
import { addMovieResult } from "../utils/searchSlice";
const SearchComponent = () => {
  const searchText = useRef();
  const dispatch = useDispatch();
  const langVarible = useSelector((store) => store.config.selectLang);
  //   console.log(langVarible);

  const handleSearchTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_Options
    );
    const json = await data.json();
    return json;
  };

  //   const handleSearch = async () => {
  //     // console.log(searchText.current.value);
  //     const query =
  //       "Suggest me 5 movie names based on " +
  //       searchText.current.value +
  //       ". Like example: Avengers, Superman, Spiderman, Batman, Captain America";
  //     const response = await client.responses.create({
  //       model: "openai/gpt-4o",
  //       input: query,
  //     });

  // const movieArray = response.output_text; //5 movies to array and push this to redux store
  // console.log(response.output_text);
  // // dispatch(addMovieName(movieArray));
  // const promiseArray = movieArray.map((movie) => handleSearchTMDB(movie));
  // const tmdbResult = await Promise.all(promiseArray);
  // // dispatch(addMovieResult(tmdbResult));

  const handleSearch = async () => {
    try {
      const userInput = searchText.current.value;
      const query =
        "Suggest me a 5 movie names based on " +
        userInput +
        ". I only want 5 movie names no need of description or anything just 5 movies seperated by commas Like example Avengers, Batman, Superman, Spiderman, Loki";
      const res = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { movieString } = await res.json();
      console.log(movieString);
      const cleaned = movieString.replace(/^\d+\.\s*/gm, "").trim();
      const movieArray = cleaned
        .split(/[\n,]+/)
        .map((m) => m.trim())
        .filter(Boolean);
      console.log(movieArray);
      const promiseArray = movieArray.map((movie) => handleSearchTMDB(movie));
      const tmdbResult = await Promise.all(promiseArray);
      console.log(tmdbResult);
      dispatch(
        addMovieResult({ movieName: movieArray, searchResult: tmdbResult })
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="md:pt-80 pt-60 flex justify-center">
      <form
        className="bg-[rgba(0,0,0,0.5)] md:w-1/2 grid grid-cols-12 rounded-lg w-screen"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 bg-[rgba(0,0,0,0.1)] text-white col-span-9"
          placeholder={lang[langVarible].placeholder}
        />
        <button
          className="text-white bg-red-700 rounded-lg col-span-3 py-2 px-4 m-4"
          onClick={handleSearch}
        >
          {lang[langVarible].search}
        </button>
      </form>
    </div>
  );
};
export default SearchComponent;
