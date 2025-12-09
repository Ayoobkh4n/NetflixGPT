import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "./constants";
import { addNowPlaying } from "./movieSlice";
import { useEffect } from "react";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const nowPlayCheck = useSelector((store) => store.movie.nowPlaying);
  const nowPlaying = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      API_Options
    );
    if (!data) return null;
    const json = await data.json();
    //console.log(json.results);
    dispatch(addNowPlaying(json.results));
  };
  useEffect(() => {
    !nowPlayCheck && nowPlaying();
  }, []);
};

export default useNowPlaying;
