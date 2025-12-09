import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "./constants";
import { addUpcoming } from "./movieSlice";
import { useEffect } from "react";

const useUpcoming = () => {
  const dispatch = useDispatch();
  const upcomingCheck = useSelector((store) => store.movie.upcoming);
  const upcoming = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_Options
    );
    if (!data) return null;

    const json = await data.json();
    // console.log(json.results);
    dispatch(addUpcoming(json.results));
  };
  useEffect(() => {
    !upcomingCheck && upcoming();
  }, []);
};

export default useUpcoming;
