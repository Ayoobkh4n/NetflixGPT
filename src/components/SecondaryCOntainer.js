import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);
  //   console.log(movies.nowPlaying);

  return (
    movies && (
      <div className="bg-black">
        <div className="mt-4 md:-mt-80 relative z-20">
          <MovieList title={"Now Playing"} cards={movies?.nowPlaying} />
          <MovieList title={"Popular"} cards={movies?.popular} />
          <MovieList title={"Top Rated"} cards={movies?.topRated} />
          <MovieList title={"Upcoming"} cards={movies?.upcoming} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
