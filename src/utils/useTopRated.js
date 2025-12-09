import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "./constants";
import { addTopRated } from "./movieSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();
  const topRatedCheck = useSelector((store) => store.movie.topRated);
  const topRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_Options
    );
    if (!data) return null;

    const json = await data.json();
    // console.log(json.results);
    dispatch(addTopRated(json.results));
  };
  useEffect(() => {
    !topRatedCheck && topRated();
  }, []);
};

export default useTopRated;
