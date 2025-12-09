import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "./constants";
import { addPopular } from "./movieSlice";
import { useEffect } from "react";

const usePopular = () => {
  const dispatch = useDispatch();
  const popularCheck = useSelector((store) => store.movie.popular);

  const popular = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_Options
    );
    if (!data) return null;

    const json = await data.json();
    // console.log(json.results);
    dispatch(addPopular(json.results));
  };
  useEffect(() => {
    !popularCheck && popular();
  }, []);
};

export default usePopular;
