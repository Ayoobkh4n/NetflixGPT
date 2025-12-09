import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieSuggestion = () => {
  const movie = useSelector((store) => store.search);
  if (!movie) return null;
  const { movieName, searchResults } = movie;
  return (
    <div>
      {movieName && (
        <div className="bg-black bg-opacity-50 p-4 m-4 rounded-lg">
          {movieName?.map((movieName, index) => (
            <MovieList
              key={movieName}
              title={movieName}
              cards={searchResults[index]?.results}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default MovieSuggestion;
