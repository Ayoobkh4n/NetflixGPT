import { useEffect } from "react";
import { API_Options } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailer } from "./movieSlice";

const useTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_Options
    );
    if (!data) return null;

    const json = await data.json();
    const filterData = json.results.filter((data) => data.type === "Trailer");
    //console.log(json.results);
    const trailer = filterData ? filterData[0] : json.results[0];
    dispatch(addTrailer(trailer));
  };

  useEffect(() => {
    trailer();
  }, [movieId]);
};

export default useTrailer;
